import { Aisle } from '../db/models/aisle';
import { useVerifyCache } from '@cache/init-verify-cache';
import { AislesGroceryItemCategories } from '@db/models/aisles-grocery-item-categories';
import { AisleDto, CacheKeys, buildAisleDtoFromAisle } from '@models/index';
import NodeCache from 'node-cache';
import { useGroceryItemCategoryController } from '.';
import { GroceryItemCategory } from '@db/models/grocery-item-category';

export const useAisleController = (cache: NodeCache) => {
	const { clearCacheKey, verifyCacheInController } = useVerifyCache(cache);
	const { findManyGroceryItemCategories } = useGroceryItemCategoryController(cache);

	const buildAisleDto = async (aisle: Aisle, categoryIds: number[]) => {
		// Convert to AisleDTO to send to front-end
		const aisleDto = buildAisleDtoFromAisle(aisle);

		try {
			// Build the categories
			const categories = (await verifyCacheInController(
				CacheKeys.AllGroceryItemCategories,
				findManyGroceryItemCategories
			)) as GroceryItemCategory[];
			// Add Categories
			// Go through the categoryIds passed in during creation and find the corresponding GroceryItemCategory for the dto
			const categoriesToInclude: GroceryItemCategory[] = [];
			categoryIds.forEach(id => {
				const addCat = categories.find(category => category.groceryItemCategoryId === id);
				if (addCat) categoriesToInclude.push(addCat);
			});
			aisleDto.categories = categoriesToInclude;
		} catch (error) {
			console.error(error);
		}

		return aisleDto;
	};

	/**
	 * POST
	 */
	const createAisle = async (
		name: string,
		groceryStoreId: number,
		aisleOrder: number,
		categoryIds?: number[]
	): Promise<AisleDto | null> => {
		let aisle: Aisle | null = null;
		let aisleDto: AisleDto | null = null;

		try {
			aisle = await Aisle.create({
				aisleOrder,
				name,
				groceryStoreId,
				updateby: 'admin'
			});
			// Clear the cache for this so new data is fetched newt time
			await clearCacheKey(CacheKeys.AllAisles);

			if (categoryIds) {
				// Update the categories
				for (const id of categoryIds) {
					await AislesGroceryItemCategories.create({
						aisleId: aisle.aisleId,
						groceryItemCategoryId: id,
						updateby: 'admin'
					});
				}
				// Convert to AisleDTO to send to front-end
			}
			aisleDto = await buildAisleDto(aisle, categoryIds ?? []);
		} catch (error) {
			console.error(error);
		}

		return aisleDto;
	};

	/**
	 * GET single aisle by id
	 */
	const findAisle = async (id: number) => {
		// let aisle: Aisle | null = null;

		// try {
		// 	aisle = await Aisle.findByPk(id);
		// } catch (error) {
		// 	console.error(error);
		// }
		const aisles = (await verifyCacheInController(CacheKeys.AllAisles, findManyAisles)) as Aisle[];
		const aisle = aisles.find(ais => ais.aisleId === id);
		return aisle;
	};

	/**
	 * PUT
	 */
	const updateAisle = async (id: number, name?: string, groceryStoreId?: number) => {
		// let aisle: Aisle | null = null;
		let aisle = await findAisle(id);

		try {
			if (name) {
				await aisle?.set({ name });
			}
			if (groceryStoreId) {
				await aisle?.set({ groceryStoreId });
			}
			const savedAisle = await aisle?.save();
			if (savedAisle) {
				// Clear cache so updated version is return next time
				await clearCacheKey(CacheKeys.AllAisles);
				aisle = savedAisle;
			}
		} catch (error) {
			console.error(error);
		}

		return aisle;
	};

	/**
	 * GET all aisles
	 */
	const findManyAisles = async () => {
		let aisles: Aisle[] = [];
		try {
			aisles = await Aisle.findAll();
		} catch (error) {
			console.error(error);
		}
		return aisles;
	};

	/**
	 * GET all aisles for a specific groceryStoreId
	 * TODO: this needed?
	 */
	const findAisleByGroceryStore = async (groceryStoreId: number) => {
		let aisles: Aisle[] = [];
		try {
			const allAisles = (await verifyCacheInController(CacheKeys.AllAisles, findManyAisles)) as Aisle[];
			aisles = allAisles.filter(ais => ais.groceryStoreId === groceryStoreId);
		} catch (error) {
			console.error(error);
		}
		return aisles;
	};

	return { buildAisleDto, createAisle, findAisle, findManyAisles, findAisleByGroceryStore, updateAisle };
};
