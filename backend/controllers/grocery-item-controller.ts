import { GroceryItem } from '../db/models/grocery-item';
import { useVerifyCache } from '@cache/init-verify-cache';
import { CacheKeys } from '@models/cache';
import NodeCache from 'node-cache';

export const useGroceryItemController = (cache: NodeCache) => {
	const { clearCacheKey, verifyCacheInController } = useVerifyCache(cache);

	/**
	 * POST
	 * @param name string - Harris Teeter
	 */
	const createGroceryItem = async (name: string, groceryItemCategoryId: number) => {
		let groceryItem: GroceryItem | null = null;

		try {
			groceryItem = await GroceryItem.create({
				name,
				updateby: 'admin',
				groceryItemCategoryId
			});
			// Clear the cache for this so new data is fetched next time
			await clearCacheKey(CacheKeys.AllGroceryItems);
		} catch (error) {
			console.error(error);
		}

		return groceryItem;
	};

	/**
	 * GET single aisle by id
	 * @param id number - 1
	 */
	const findGroceryItem = async (id: number) => {
		const groceryItem = await GroceryItem.findOne({
			where: {
				groceryItemId: id
			}
		});
		return groceryItem;
	};

	/**
	 * GET allGroceryItems
	 */
	const findManyGroceryItems = async () => {
		let allGroceryItems = [] as GroceryItem[];
		try {
			allGroceryItems = await GroceryItem.findAll();
		} catch (error: any) {
			console.error(error);
		}
		return allGroceryItems;
	};

	/**
	 * PUT
	 * @param id number - unique id
	 * @param name string - Harris Teeter
	 */
	const updateGroceryItem = async (id: number, name: string) => {
		let groceryItem = await findGroceryItem(id);

		try {
			groceryItem = await findGroceryItem(id);
			await groceryItem?.set({ name, updateby: 'admin' }); // TODO: admin to auth
			const newItem = await groceryItem?.save();
			if (newItem) {
				// Clear the cache for this so new data is fetched next time
				await clearCacheKey(CacheKeys.AllGroceryItems);
				groceryItem = newItem;
			}
		} catch (error) {
			console.error(error);
		}

		return groceryItem;
	};

	return {
		createGroceryItem,
		findGroceryItem,
		findManyGroceryItems,
		updateGroceryItem
	};
};
