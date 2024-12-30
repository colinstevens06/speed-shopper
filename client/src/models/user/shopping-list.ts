import type { SequelizeBase } from '@models/base';
import type { Aisle, GroceryItem } from '..';

export interface ShoppingList extends SequelizeBase {
	shoppingListId?: number;
	name: string;
	groceryItems: GroceryItem[]; // reasoning for having this: I think so... because I think the stored object will be a list of groceryItems with (or without) a storeId ... but a 'shopping list' can be used in many stores, so gonna save it with just groceryItems
	aisles: Aisle[];
}

export const initShoppingList = (state?: ShoppingList): ShoppingList => {
	state ??= {} as ShoppingList;

	state.name = '';
	// state.groceryItems = [];
	state.aisles = [];

	return state;
};
