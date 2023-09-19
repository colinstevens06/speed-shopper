import { useVerifyCache } from '@cache/init-verify-cache';
import { useGroceryItemController } from '../../controllers/grocery-item-controller';
import { Express, Request, Response } from 'express';
import NodeCache from 'node-cache';
import { GroceryItem } from '@db/models/grocery-item';

export const useGroceryItemApi = (app: Express, cache: NodeCache) => {
	const { createGroceryItem, findGroceryItem, findManyGroceryItems, updateGroceryItem } =
		useGroceryItemController(cache);

	const { verifyCacheInApi } = useVerifyCache(cache);

	const baseUrl = '/api/grocery-items';

	/**
	 * Get groceryStoreName by ID
	 * @returns null if not found
	 */
	const getGroceryItem = () => {
		return app.get(`${baseUrl}/:id`, async (req: Request, res: Response) => {
			const groceryItem = await findGroceryItem(parseInt(req.params.id));
			res.send(groceryItem);
		});
	};

	/**
	 * GET all addresses
	 * @returns array addresses
	 */
	const getAllGroceryItems = async () => {
		return app.get(`${baseUrl}`, verifyCacheInApi, async (req: Request, res: Response) => {
			let allGroceryItems: GroceryItem[] = [];
			try {
				allGroceryItems = await findManyGroceryItems();
				cache.set(req.url, allGroceryItems);
				res.send(allGroceryItems);
			} catch (error) {
				console.error(error);
			}
		});
	};

	/**
	 * POST will include a
	 */
	const postGroceryItem = () => {
		return app.post(`${baseUrl}`, async (req: Request, res: Response) => {
			const name = req.body.name;
			const id = req.body.id;
			try {
				const newGroceryItem = await createGroceryItem(name, id);
				res.send(newGroceryItem);
			} catch (error) {
				console.error(error);
			}
		});
	};

	/**
	 * POST will include a
	 */
	const putGroceryItem = () => {
		return app.put(`${baseUrl}/:id`, async (req: Request, res: Response) => {
			const id = parseInt(req.params.id);
			const name = req.body.name;

			const updatedGroceryItem = await updateGroceryItem(id, name);
			res.send(updatedGroceryItem);
		});
	};

	getAllGroceryItems();
	getGroceryItem();
	putGroceryItem();
	postGroceryItem();

	return { getAllGroceryItems, getGroceryItem, postGroceryItem };
};
