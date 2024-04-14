import { GroceryStoreName } from '../../db/models/grocery-store-name';
import { useGroceryStoreNameController } from '../../controllers/grocery-store-name-controller';
import { Express, Request, Response } from 'express';
import NodeCache from 'node-cache';
import { useVerifyCache } from '@cache/init-verify-cache';
import { ResultType, initPostResult } from '@models/dto';

export const useGroceryStoreNameApi = (app: Express, cache: NodeCache) => {
	const { createGroceryStoreName, findGroceryStoreName, findManyGroceryStoreNames, updateGroceryStoreName } =
		useGroceryStoreNameController(cache);

	const { verifyCacheInApi } = useVerifyCache(cache);

	const baseUrl = '/api/grocery-store-names';

	/**
	 * Get groceryStoreName by ID
	 * @returns null if not found
	 */
	const getGroceryStoreName = () => {
		return app.get(`${baseUrl}/:id`, async (req: Request, res: Response) => {
			const name = await findGroceryStoreName(parseInt(req.params.id));
			res.send(name);
		});
	};

	/**
	 * GET all addresses
	 * @returns array addresses
	 */
	const getAllGroceryStoreNames = () => {
		return app.get(`${baseUrl}`, verifyCacheInApi, async (req: Request, res: Response) => {
			let allGroceryStoreNames: GroceryStoreName[] = [];
			try {
				allGroceryStoreNames = await findManyGroceryStoreNames();
				// console.log(allGroceryStoreNames);
				cache.set(req.url, allGroceryStoreNames);
				res.send(allGroceryStoreNames);
			} catch (error) {
				console.error(error);
			}
		});
	};

	/**
	 * POST will include a name - Harris Teeter
	 */
	const postGroceryStoreName = () => {
		return app.post(`${baseUrl}`, async (req: Request, res: Response) => {
			console.log('Attempting a POST for Grocery Store Name');
			console.log('body', req.body);
			const groceryStoreName = req.body.name;

			const postResult = initPostResult();
			let newName: GroceryStoreName | undefined;
			try {
				newName = await createGroceryStoreName(groceryStoreName);

				if (newName) {
					postResult.resultType = ResultType.Success;
					postResult.value = newName;
				}
			} catch (error) {
				console.error(error);
				postResult.errorMessages.push('There was an error creating the grocery store name. Please try again later.');
			}
			res.send(postResult);
		});
	};

	/**
	 * PUT will include a name - Harris Teeter
	 */
	const putGroceryStoreName = () => {
		return app.put(`${baseUrl}/:id`, async (req: Request, res: Response) => {
			const id = parseInt(req.params.id);
			const name = req.body.name;

			const updatedGroceryStoreName = await updateGroceryStoreName(id, name);

			res.send(updatedGroceryStoreName);
		});
	};

	getAllGroceryStoreNames();
	getGroceryStoreName();
	putGroceryStoreName();
	postGroceryStoreName();

	return { getAllGroceryStoreNames, getGroceryStoreName, postGroceryStoreName };
};
