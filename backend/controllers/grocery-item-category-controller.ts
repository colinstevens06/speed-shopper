import { useVerifyCache } from '@cache/init-verify-cache';
import { CacheKeys } from '@models/cache';
import NodeCache from 'node-cache';
import { GroceryItemCategory } from '../db/models/grocery-item-category';
import { GroceryItemGroceryItemCategories } from '@db/models/grocery-item-grocery-item-categories';
import { GroceryItemCategoryDto, initGroceryItemCategoryDto } from '@models/dto';
import { GroceryItem } from '@db/models/grocery-item';
import { useGroceryItemController } from '.';

// import { GroceryItemCategory } from '../db/models/grocery-item-category';
export const useGroceryItemCategoryController = (cache: NodeCache) => {
	const { clearCacheKey, verifyCacheInController } = useVerifyCache(cache);

	const { createGroceryItem, findGroceryItem, findManyGroceryItems, updateGroceryItem } =
		useGroceryItemController(cache);

	/**
	 * POST
	 * @param name string - Harris Teeter
	 */
	const createGroceryItemCategory = async (name: string) => {
		let groceryItemCategory = new GroceryItemCategory();
		try {
			groceryItemCategory = await GroceryItemCategory.create({
				name,
				updateby: 'admin'
			});
			// Clear the cache for this so new data is fetched next time
			await clearCacheKey(CacheKeys.AllGroceryItemCategories);
		} catch (error) {
			console.error(error);
		}

		return groceryItemCategory;
	};
	/**
	 * GET single aisle by id
	 * @param id number - 1
	 */
	const findGroceryItemCategory = async (id: number) => {
		let groceryItemCategory: GroceryItemCategory | null = null;
		try {
			groceryItemCategory = await GroceryItemCategory.findOne({
				where: {
					groceryItemCategoryId: id
				}
			});
		} catch (error) {
			console.error(error);
		}

		return groceryItemCategory;
	};

	/**
	 * GET allGroceryItemCategories
	 */
	const findManyGroceryItemCategories = async () => {
		const allGroceryItemCategories = [] as GroceryItemCategoryDto[];
		try {
			const allCategories = await GroceryItemCategory.findAll();
			const allGroceryItems = (await verifyCacheInController(
				CacheKeys.AllGroceryItems,
				await findManyGroceryItems
			)) as GroceryItem[];

			for await (const category of allCategories) {
				const categoryItemCombo = await GroceryItem.findAll({
					where: {
						groceryItemCategoryId: category.groceryItemCategoryId
					}
				});

				const groceryItemsForCategory: GroceryItem[] = [];

				for await (const catItemCombo of categoryItemCombo) {
					const groceryItem = allGroceryItems.find(grocItem => grocItem.groceryItemId === catItemCombo.groceryItemId);
					if (groceryItem) groceryItemsForCategory.push(groceryItem);
				}

				// got those items
				const newCat = initGroceryItemCategoryDto(category, groceryItemsForCategory);
				allGroceryItemCategories.push(newCat);
			}
		} catch (error: any) {
			console.error(error);
		}
		return allGroceryItemCategories;
	};

	/**
	 * PUT
	 * @param id number - unique id
	 * @param name string - Harris Teeter
	 */
	const updateGroceryItemCategory = async (id: number, name: string) => {
		let groceryItemCategory = await findGroceryItemCategory(id); // TODO: do a controller cache look for single item
		try {
			if (groceryItemCategory) {
				await groceryItemCategory?.set({ name, updateby: 'admin' }); // TODO: admin to auth
				const savedCategory = await groceryItemCategory?.save();
				if (savedCategory) {
					// Clear the cache for this so new data is fetched next time
					await clearCacheKey(CacheKeys.AllGroceryItemCategories);
					groceryItemCategory = savedCategory;
				}
			}
			// groceryItemCategory = await findGroceryItemCategory(id);
		} catch (error) {
			console.error(error);
		}

		return groceryItemCategory;
	};

	return {
		createGroceryItemCategory,
		findGroceryItemCategory,
		findManyGroceryItemCategories,
		updateGroceryItemCategory
	};
};
