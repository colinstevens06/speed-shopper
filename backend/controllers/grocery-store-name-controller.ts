import { GroceryStoreName } from '../db/models/grocery-store-name';
import { useVerifyCache } from '@cache/init-verify-cache';
import { CacheKeys } from '@models/cache';
import NodeCache from 'node-cache';

export const useGroceryStoreNameController = (cache: NodeCache) => {
	const { clearCacheKey, verifyCacheInController } = useVerifyCache(cache);

	/**
	 * POST
	 * @param name string - ie Harris Teeter
	 * @returns
	 */
	const createGroceryStoreName = async (name: string) => {
		let newGroceryStoreName: GroceryStoreName | undefined = undefined;

		try {
			newGroceryStoreName = await GroceryStoreName.create({
				name,
				updateby: 'admin'
			});
			// Clear the cache for this so new data is fetched next time
			await clearCacheKey(CacheKeys.AllGroceryStoreNames);
		} catch (error) {
			console.error(error);
		}

		return newGroceryStoreName;
	};

	/**
	 * GET unique groceryStoreName
	 * @param name string - Harris Teeter
	 * @returns GroceryStoreName
	 */
	const findGroceryStoreName = async (id: number) => {
		let groceryStoreName: GroceryStoreName | null = null;
		try {
			groceryStoreName = await GroceryStoreName.findByPk(id);
		} catch (error) {
			console.error(error);
		}
		return groceryStoreName;
	};

	/**
	 * GET allGroceryStoreNames
	 */
	const findManyGroceryStoreNames = async () => {
		let allGroceryNames = [] as GroceryStoreName[];
		try {
			allGroceryNames = await GroceryStoreName.findAll();
		} catch (error: any) {
			console.error(error);
		}
		return allGroceryNames;
	};

	/**
	 * PUT
	 * @param id number - unique id
	 * @param name string - ie Harris Teeter
	 * @returns
	 */
	const updateGroceryStoreName = async (id: number, name: string) => {
		let groceryStoreName = await findGroceryStoreName(id);

		try {
			if (groceryStoreName) {
				await groceryStoreName.set({ name });
				const savedName = await groceryStoreName.save();
				if (savedName) {
					// Clear the cache for this so new data is fetched next time
					await clearCacheKey(CacheKeys.AllGroceryStoreNames);
					groceryStoreName = savedName;
				}
			}
		} catch (error) {
			console.error(error);
		}
		return groceryStoreName;
	};

	return {
		createGroceryStoreName,
		findGroceryStoreName,
		findManyGroceryStoreNames,
		updateGroceryStoreName
	};
};
