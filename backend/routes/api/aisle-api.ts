import NodeCache from 'node-cache';
import { useAisleController } from '../../controllers/aisle-controller';
import { Express, Request, Response } from 'express';
import { useVerifyCache } from '@cache/init-verify-cache';
import { Aisle } from '@db/models/aisle';
import { ResultType, initPostResult } from '@models/dto';

export const useAisleApi = (app: Express, cache: NodeCache) => {
	const { createAisle, findAisle, findManyAisles, updateAisle } = useAisleController(cache);

	const { verifyCacheInApi } = useVerifyCache(cache);

	const baseUrl = '/api/aisles';
	/**
	 * Get groceryStoreName by ID
	 * @returns null if not found
	 */
	const getAisle = () => {
		return app.get(`${baseUrl}/:name`, async (req: Request, res: Response) => {
			const address = await findAisle(parseInt(req.params.name));
			res.send(address);
		});
	};

	/**
	 * GET all addresses
	 * @returns array addresses
	 */
	const getAllAisles = () => {
		return app.get(`${baseUrl}`, verifyCacheInApi, async (req: Request, res: Response) => {
			let aisles: Aisle[] = [];
			try {
				aisles = await findManyAisles();
				cache.set(req.url, aisles);
				res.send(aisles);
			} catch (error) {
				console.error(error);
			}
		});
	};

	/**
	 * Post will include a name
	 */
	const postAisle = () => {
		return app.post(`${baseUrl}`, async (req: Request, res: Response) => {
			const name = req.body.name;
			const groceryStoreId = req.body.groceryStoreId;
			const aisleOrder = parseInt(req.body.aisleOrder);
			let groceryItemCategoryIds = [...req.body.groceryItemCategoryIds];
			groceryItemCategoryIds = groceryItemCategoryIds.map(item => parseInt(item));
			try {
				const postResult = initPostResult();

				const newAisle = await createAisle(name, groceryStoreId, aisleOrder, groceryItemCategoryIds);

				if (newAisle) {
					postResult.resultType = ResultType.Success;
					postResult.value = newAisle;
				}

				res.send(postResult);
			} catch (error) {
				console.error(error);
			}
		});
	};

	/**
	 * PUT will include a name
	 */
	const putAisle = () => {
		return app.put(`${baseUrl}/:id`, async (req: Request, res: Response) => {
			const id = parseInt(req.params.id);
			const name = req.body.name;
			const updatedAisle = await updateAisle(id, name);
			res.send(updatedAisle);
		});
	};

	// Call them so they get added to API
	getAisle();
	getAllAisles();
	putAisle();

	return { getAisle, getAllAisles, postAisle };
};
