import { GroceryStore } from '../db/models/grocery-store';
import { Address } from '../db/models/address';
import { GroceryStoreName } from '../db/models/grocery-store-name';
import { Aisle } from '../db/models/aisle';
import { useAisleController } from './aisle-controller';
import { AisleDto, CacheKeys, GroceryStoreDto, initGroceryStoreDto } from '@models/index';
import { useAddressController, useGroceryStoreNameController } from '.';
import NodeCache from 'node-cache';
import { useVerifyCache } from '@cache/init-verify-cache';
import { AislesGroceryItemCategories } from '@db/models/aisles-grocery-item-categories';

// findGroceryStore
export const useGroceryStoreControllers = (nodeCache: NodeCache) => {
	const { buildAisleDto, createAisle, findManyAisles } = useAisleController(nodeCache);
	const { findManyAddresses } = useAddressController(nodeCache);
	const { findManyGroceryStoreNames } = useGroceryStoreNameController(nodeCache);
	const { clearCacheKey, verifyCacheInController } = useVerifyCache(nodeCache);

	/**
	 * POST to create GroceryStore and all the aisles associated with it
	 * @param addressId
	 * @param storeName
	 * @returns
	 */
	const createGroceryStore = async (
		addressId: number,
		groceryStoreNameId: number,
		aisles: AisleDto[]
	): Promise<GroceryStoreDto> => {
		let newGroceryStore: GroceryStore | null = null;
		let newGroceryStoreDto = initGroceryStoreDto();

		try {
			newGroceryStore = await GroceryStore.create({
				addressId,
				groceryStoreNameId,
				updateby: 'admin'
			});
			if (newGroceryStore) {
				// Clear the cache for this so new data is fetched next time
				await clearCacheKey(CacheKeys.AllGroceryStores);
			}
			// Update the other values for the DTO (aisles created separately)
			newGroceryStoreDto = await buildGroceryStoreDto(newGroceryStore, false);

			// Create all the aisles associated with our new GroceryStore
			for await (const a of aisles) {
				const categoryIds = a.categories.map(item => item.groceryItemCategoryId);
				const aisle = await createAisle(a?.name, newGroceryStore.groceryStoreId, a?.aisleOrder, categoryIds);
				// Update the GroceryStore w the aisle
				if (aisle) {
					newGroceryStoreDto.aisles.push(aisle);
				}
			}
		} catch (error) {
			console.error(error);
		}

		return newGroceryStoreDto;
	};

	const findGroceryStore = async (id: number): Promise<GroceryStoreDto> => {
		// Build DTO to send to frontend
		let newGroceryStoreDto = initGroceryStoreDto();
		let groceryStore: GroceryStore | null = null;

		try {
			groceryStore = await GroceryStore.findByPk(id);
			if (groceryStore) {
				newGroceryStoreDto = await buildGroceryStoreDto(groceryStore);
			}
		} catch (error) {
			console.error(error);
		}
		return newGroceryStoreDto;
	};

	/**
	 * GET allGroceryStores
	 */
	const findManyGroceryStores = async (): Promise<GroceryStoreDto[]> => {
		const groceryStoresDto: GroceryStoreDto[] = [];
		let allGroceryStores = [] as GroceryStore[];
		try {
			allGroceryStores = await GroceryStore.findAll();
			// groceryStores = await GroceryStore.findAll(); // update to hit the cache
			for await (const store of allGroceryStores) {
				const groceryStoreDto = await buildGroceryStoreDto(store);
				groceryStoresDto.push(groceryStoreDto);
			}
		} catch (error) {
			console.error(error);
		}

		return groceryStoresDto;
	};

	// const updateGroceryStore = async (groceryStoreId: number, aisles: Aisle[], storeName: string, addressId: number) => {
	// 	const updatedGroceryStore = await prisma.groceryStore.update({
	// 		where: {
	// 			id: groceryStoreId
	// 		},
	// 		data: {
	// 			aisles: aisles,
	// 			storeName: storeName,
	// 			addressId: addressId
	// 		},
	// 		select: {
	// 			aisles: true
	// 		}
	// 	});
	// 	// update the nameId
	// 	// update the aisles
	// 	// update addressId
	// };

	const buildGroceryStoreDto = async (
		groceryStore: GroceryStore,
		buildAisles: boolean = true
	): Promise<GroceryStoreDto> => {
		const newGroceryStoreDto = initGroceryStoreDto();
		// Find address and name
		const addresses = (await verifyCacheInController(CacheKeys.AllAddresses, findManyAddresses)) as Address[];

		const address = addresses.find(address => address.addressId === groceryStore.addressId);

		const groceryStoreNames = (await verifyCacheInController(
			CacheKeys.AllGroceryStoreNames,
			findManyGroceryStoreNames
		)) as GroceryStoreName[];

		const groceryStoreName = groceryStoreNames.find(
			name => name.groceryStoreNameId === groceryStore.groceryStoreNameId
		);
		// Build the DTO
		newGroceryStoreDto.groceryStoreId = groceryStore.groceryStoreId;
		newGroceryStoreDto.address = address ?? new Address();
		newGroceryStoreDto.groceryStoreName = groceryStoreName?.name ?? '';

		if (buildAisles) {
			const allAisles = (await verifyCacheInController(CacheKeys.AllAisles, findManyAisles)) as Aisle[];

			const aisles = allAisles.filter(aisle => aisle.groceryStoreId === groceryStore.groceryStoreId);
			const aislesDto: AisleDto[] = [];
			for await (const aisle of aisles) {
				const combos = await AislesGroceryItemCategories.findAll({
					where: {
						aisleId: aisle.aisleId
					}
				});
				const minifiedCombos = combos.map(combo => combo.groceryItemCategoryId);
				const aisleDto = await buildAisleDto(aisle, minifiedCombos);
				aislesDto.push(aisleDto);
			}
			newGroceryStoreDto.aisles = [...aislesDto];
		}

		return newGroceryStoreDto;
	};

	return { createGroceryStore, findGroceryStore, findManyGroceryStores };
};
