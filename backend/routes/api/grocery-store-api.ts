import { GroceryStoreName } from '../../db/models/grocery-store-name';
import { useGroceryStoreControllers } from '../../controllers/grocery-store-controller';
import { useAddressController, useGroceryStoreNameController } from '../../controllers/index';
import { Express, Request, Response } from 'express';
import { Address } from '@db/models/address';
import { Aisle } from '@db/models/aisle';
import NodeCache from 'node-cache';
import { useVerifyCache } from '@cache/init-verify-cache';
import { AisleDto } from '@models/dto';

export const useGroceryStoreApi = (app: Express, cache: NodeCache) => {
	const { createGroceryStore, findGroceryStore, findManyGroceryStores } = useGroceryStoreControllers(cache);
	const { createAddress, findAddress, findAddressByAddressCityState } = useAddressController(cache);
	const { createGroceryStoreName, findGroceryStoreName } = useGroceryStoreNameController(cache);

	const { verifyCacheInApi } = useVerifyCache(cache);

	const baseUrl = '/api/grocery-stores';

	/**
	 * Get grocery story by ID
	 */
	const getGroceryStore = () => {
		return app.get(`${baseUrl}/:id`, async (req: Request, res: Response) => {
			const idToFind = parseInt(req.params.id);
			const groceryStore = await findGroceryStore(idToFind);

			res.send(groceryStore);
		});
	};

	/**
	 * GET all addresses
	 * @returns array addresses
	 */
	const getAllGroceryStores = () => {
		return app.get(`${baseUrl}`, verifyCacheInApi, async (req: Request, res: Response) => {
			const allGroceryStores = await findManyGroceryStores();
			cache.set(req.url, allGroceryStores);
			res.send(allGroceryStores);
		});
	};

	/**
	 * Post will include address and name
	 */
	const postGroceryStore = () => {
		return app.post(`${baseUrl}`, async (req: Request, res: Response) => {
			console.log('*** === Attempting to create a new grocery store');
			const address: Address = req.body.address;
			let newAddress: Address = address;
			const groceryStoreNameId: number = req.body.nameId;
			const aisleDto: AisleDto[] = req.body.aisles;

			const addressExists = await findAddressByAddressCityState(address); // TODO: this needs to check by name

			if (!addressExists) {
				// Create address if one does not exist
				newAddress = await createAddress(address);
			} else {
				// return that the address already exists ... and UI should send them to a list of stores ... and they can add one to their favorites
				res.send('Address already exists.'); // TODO: enhance error handling
			}

			// Address and GroceryStoreName built
			// Continue to build grocery store
			try {
				const newStore = await createGroceryStore(newAddress.addressId, groceryStoreNameId, aisleDto); // todo should not be empty array
				res.send(newStore);
			} catch (err) {
				res.send('An error occurred.'); // TODO: enhance error handling
			}
		});
	};

	const putGroceryStore = () => {
		return app.put(`${baseUrl}/:id`, async (req: Request, res: Response) => {
			const id = req.params.id;
			const address: Address = req.body.address;
			const newAddress: Address = address;
			const name: string = req.body.name;
			let newName: GroceryStoreName;
			const aisles: Aisle[] = req.body.ailes;
			let newAisles: Aisle[];
		});
	};

	getAllGroceryStores();
	getGroceryStore();

	return { getAllGroceryStores, getGroceryStore, postGroceryStore };
};
