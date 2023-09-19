import { useVerifyCache } from '@cache/init-verify-cache';
import { CacheKeys } from '@models/cache';
import NodeCache from 'node-cache';
import { GroceryItemCategory } from '../db/models/grocery-item-category';

// import { GroceryItemCategory } from '../db/models/grocery-item-category';
export const useGroceryItemCategoryController = (cache: NodeCache) => {
	const { clearCacheKey, verifyCacheInController } = useVerifyCache(cache);

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
		let allGroceryItemCategories = [] as GroceryItemCategory[];
		try {
			allGroceryItemCategories = await GroceryItemCategory.findAll();
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
