import NodeCache from 'node-cache';
import { useGroceryItemCategoryController } from '@controllers/grocery-item-category-controller';
import { Express, Request, Response } from 'express';
import { GroceryItemCategory } from '@db/models/grocery-item-category';
import { useVerifyCache } from '@cache/init-verify-cache';
import { GroceryItemCategoryDto, ResultType, initPostResult } from '@models/dto';

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
			let address;
			try {
				address = await findGroceryItemCategory(parseInt(req.params.id));
			} catch (error) {
				console.error(error);
				throw new Error('There was an error while getting the grocery item. Please try again later.');
			}
			res.send(address);
		});
	};

	/**
	 * GET all addresses
	 * @returns array addresses
	 */
	const getAllGroceryItemCategories = () => {
		return app.get(`${baseUrl}`, verifyCacheInApi, async (req: Request, res: Response) => {
			let allGroceryItemCategories: GroceryItemCategoryDto[] = [];

			try {
				allGroceryItemCategories = await findManyGroceryItemCategories();
				cache.set(req.url, allGroceryItemCategories);
				res.send(allGroceryItemCategories);
			} catch (error) {
				console.error(error);
				throw new Error('There was an error retrieving the grocery item categories. Please try again later.');
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
				const postResult = initPostResult();
				const newGroceryItemCategory = await createGroceryItemCategory(name);

				if (newGroceryItemCategory) {
					postResult.resultType = ResultType.Success;
					postResult.value = newGroceryItemCategory;
				}

				res.send(postResult);
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
