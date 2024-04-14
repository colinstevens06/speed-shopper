import { GroceryItem } from '@db/models/grocery-item';
import { ShoppingList } from '@db/models/shopping-list';

export interface ShoppingListDto {
	shoppingListId: number;
	name: string;
	updateby: string;
	userId: number;
	groceryItems: GroceryItem[];
}

export interface NewShoppingListDto {
	name: string;
	userId: number;
	groceryItemIds: number[];
}

export interface ShoppingListPostDto {
	name: string;
	clerkUserId: string;
	groceryItemIds: number[];
}

export const initDtoFromShoppingList = (list: ShoppingList): ShoppingListDto => {
	const dto = {} as ShoppingListDto;

	dto.shoppingListId = list.shoppingListId;
	dto.name = list.name;
	dto.updateby = list.updateby;
	dto.userId = list.userId;
	dto.groceryItems = [];

	return dto;
};
