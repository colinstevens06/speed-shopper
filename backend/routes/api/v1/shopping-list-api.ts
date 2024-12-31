import NodeCache from 'node-cache';
import { Express, Request, Response } from 'express';
import { useVerifyCache } from '@cache/init-verify-cache';
import { ShoppingListDto, NewShoppingListDto, ShoppingListPostDto } from '@models/dto/shopping-list-dto';
import { useShoppingListController } from '@controllers/shopping-list-controller';
import { ResultType, initPostResult } from '@models/index';
import { useUserController } from '@controllers/user-controller';

export const useShoppingListApi = (app: Express, cache: NodeCache) => {
	const { verifyCacheInApi } = useVerifyCache(cache);
	const { postShoppingList, findAllShoppingListsForUser } = useShoppingListController(cache);
	const { createNewUser, findUserByClerkId } = useUserController(cache);

	const baseUrl = '/api/shopping-lists';

	const createShoppingList = () => {
		return app.post(baseUrl, async (req: Request, res: Response) => {
			console.log('Attempting a POST for a user Shopping List');
			const newShoppingListDto = req.body as ShoppingListPostDto;

			const postResult = initPostResult();

			let newShoppingList: ShoppingListDto | undefined = undefined;
			try {
				// Get the user so we can use to the userId as the primary key
				const user = await findUserByClerkId(newShoppingListDto.clerkUserId);
				if (user) {
					newShoppingList = await postShoppingList(
						newShoppingListDto.name,
						user.userId,
						newShoppingListDto.groceryItemIds
					);
				}
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
			const clerkUserId = req.query.clerkUserId as string;

			let allShoppingLists: ShoppingListDto[];
			try {
				const user = await findUserByClerkId(clerkUserId);
				if (user) {
					allShoppingLists = await findAllShoppingListsForUser(user.userId);
					// TODO: Set cache?
					res.send(allShoppingLists);
				}
			} catch (error) {
				console.error(error);
			}
		});
	};

	createShoppingList();
	getAllShoppingListsForUser();
};
