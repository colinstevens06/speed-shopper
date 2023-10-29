import NodeCache from 'node-cache';
import { Express, Request, Response } from 'express';
import { useVerifyCache } from '@cache/init-verify-cache';
import { ShoppingListDto, ShoppingListPostDto } from '@models/dto/shopping-list-dto';
import { useShoppingListController } from '@controllers/shopping-list-controller';
import { ResultType, initPostResult } from '@models/index';

export const useShoppingListApi = (app: Express, cache: NodeCache) => {
	const { verifyCacheInApi } = useVerifyCache(cache);
	const { postShoppingList, findAllShoppingListsForUser } = useShoppingListController(cache);

	const baseUrl = '/api/shopping-lists';

	const createShoppingList = () => {
		return app.post(baseUrl, async (req: Request, res: Response) => {
			console.log('Attempting a POST for a user Shopping List');
			const newShoppingListDto = req.body as ShoppingListPostDto;

			const postResult = initPostResult();

			let newShoppingList: ShoppingListDto | undefined = undefined;
			try {
				newShoppingList = await postShoppingList(
					newShoppingListDto.name,
					newShoppingListDto.userId,
					newShoppingListDto.groceryItemIds
				);
				postResult.resultType = ResultType.Success;
				postResult.value = newShoppingList as ShoppingListDto;
			} catch (error) {
				postResult.errorMessages.push('There was an error creating the shopping list. Please try again later');
			}

			res.send(postResult);
		});
	};

	const getAllShoppingListsForUser = () => {
		return app.get(`${baseUrl}`, verifyCacheInApi, async (req: Request, res: Response) => {
			console.log('Attempting a GET for all Shopping Lists');
			const userId = parseInt(req.body.userId);
			let allShoppingLists: ShoppingListDto[];
			try {
				allShoppingLists = await findAllShoppingListsForUser(userId);
				// Set cache?
				res.send(allShoppingLists);
			} catch (error) {
				console.error(error);
			}
		});
	};

	createShoppingList();
	getAllShoppingListsForUser();
};

