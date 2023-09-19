import NodeCache from 'node-cache';
import { useGroceryItemCategoryController } from '../../controllers/grocery-item-category-controller';
import { Express, Request, Response } from 'express';
import { GroceryItemCategory } from '@db/models/grocery-item-category';
import { useVerifyCache } from '@cache/init-verify-cache';

export const useGroceryItemCategoryApi = (app: Express, cache: NodeCache) => {
	const {
		createGroceryItemCategory,
		findGroceryItemCategory,
		findManyGroceryItemCategories,
		updateGroceryItemCategory
	} = useGroceryItemCategoryController(cache);

	const { verifyCacheInApi } = useVerifyCache(cache);

	const baseUrl = '/api/grocery-item-categories';

	/**
	 * Get groceryStoreName by ID
	 * @returns null if not found
	 */
	const getGroceryItemCategory = () => {
		return app.get(`${baseUrl}/:id`, async (req: Request, res: Response) => {
			const address = await findGroceryItemCategory(parseInt(req.params.id));
			res.send(address);
		});
	};

	/**
	 * GET all addresses
	 * @returns array addresses
	 */
	const getAllGroceryItemCategories = () => {
		return app.get(`${baseUrl}`, verifyCacheInApi, async (req: Request, res: Response) => {
			let allGroceryItemCategories: GroceryItemCategory[] = [];

			try {
				allGroceryItemCategories = await findManyGroceryItemCategories();
				cache.set(req.url, allGroceryItemCategories);
				res.send(allGroceryItemCategories);
			} catch (error) {
				console.error(error);
			}
		});
	};

	/**
	 * Post will include a name - ie Produce
	 */
	const postGroceryItemCategory = () => {
		return app.post(`${baseUrl}`, async (req: Request, res: Response) => {
			const name = req.body.name;
			try {
				const newGroceryItemCategory = await createGroceryItemCategory(name);
				res.send(newGroceryItemCategory);
			} catch (error) {
				console.error(error);
			}
		});
	};

	/**
	 * Post will include a name - ie Produce
	 */
	const putGroceryItemCategory = () => {
		return app.put(`${baseUrl}/:id`, async (req: Request, res: Response) => {
			const id = parseInt(req.params.id);
			const name = req.body.name;

			const updatedGroceryItemCategory = await updateGroceryItemCategory(id, name);

			res.send(updatedGroceryItemCategory);
		});
	};

	getAllGroceryItemCategories();
	getGroceryItemCategory();
	putGroceryItemCategory();
	postGroceryItemCategory();

	return {
		getAllGroceryItemCategories,
		getGroceryItemCategory,
		postGroceryItemCategory
	};
};
