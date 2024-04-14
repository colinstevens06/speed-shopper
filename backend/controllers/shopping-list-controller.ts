import { useVerifyCache } from '@cache/init-verify-cache';
import { ShoppingList } from '@db/models/shopping-list';
import { ShoppingListGroceryItem } from '@db/models/shopping-list-grocery-item';
import { CacheKeys } from '@models/cache';
import { ShoppingListDto, initDtoFromShoppingList } from '@models/dto/shopping-list-dto';
import NodeCache from 'node-cache';
import { useGroceryItemController } from '.';
import { GroceryItem } from '@db/models/grocery-item';

export const useShoppingListController = (nodeCache: NodeCache) => {
	const { clearCacheKey, verifyCacheInController } = useVerifyCache(nodeCache);

	const { findManyGroceryItems, getAllGroceryItemsByIds } = useGroceryItemController(nodeCache);

	const postShoppingList = async (name: string, userId: number, groceryItemIds: number[]) => {
		// need a name
		// userId
		// list of groceryItemIds
		let newShoppingList: ShoppingList | undefined = undefined;
		let shoppingListDto: ShoppingListDto | undefined = undefined;

		try {
			newShoppingList = await ShoppingList.create({
				name,
				updateby: 'admin',
				userId
			});

			if (newShoppingList) {
				// do a loop to create all the m2m for groceryItems and the list
				for await (const groceryItemId of groceryItemIds) {
					await ShoppingListGroceryItem.create({
						groceryItemId,
						shoppingListId: newShoppingList.shoppingListId
					});
				}
				// Build the dto
				shoppingListDto = initDtoFromShoppingList(newShoppingList);
				shoppingListDto.groceryItems = await getAllGroceryItemsByIds(groceryItemIds);
			}
		} catch (error) {
			console.error(error);
		}

		return shoppingListDto; // TODO: return the DTO with complete shopping list
	};

	const findAllShoppingListsForUser = async (userId: number): Promise<ShoppingListDto[]> => {
		let shoppingLists = [] as ShoppingList[];
		const shoppingListDtos = [] as ShoppingListDto[];

		try {
			shoppingLists = await ShoppingList.findAll({
				where: {
					userId
				}
			});

			// Then build all the grocery items
			for await (const list of shoppingLists) {
				const shoppingListDto = initDtoFromShoppingList(list);

				// Get the m2m DB listing
				const shoppingListsGroceryItems = await ShoppingListGroceryItem.findAll({
					where: { shoppingListId: list.shoppingListId }
				});

				if (shoppingListsGroceryItems) {
					const groceryItemIds = shoppingListsGroceryItems.map(slgi => slgi.groceryItemId);

					const groceryItems = await getAllGroceryItemsByIds(groceryItemIds);

					shoppingListDto.groceryItems = [...groceryItems];
				}
				// Add to the list of DTOs
				shoppingListDtos.push(shoppingListDto);
			}
		} catch (error) {
			console.error(error);
		}

		return shoppingListDtos;
	};

	return {
		postShoppingList,
		findAllShoppingListsForUser
	};
};
