import type { GroceryItem, GroceryItemCategory, GroceryStore } from '@models/store-builder';
import type { ShoppingList } from '@models/user';
import { initNewShoppingList, initShoppingViews, type NewShoppingList, type ShoppingViews } from '@models/views/index';

export interface ShoppingStoreState {
	allGroceryItems: GroceryItem[];
	allGroceryItemCategories: GroceryItemCategory[];
	allGroceryStores: GroceryStore[];
	shoppingLists: ShoppingList[];
	newShoppingList: NewShoppingList;
	userSelections: NewShoppingList; // track what the user selects on the different screens
	viewToggles: ShoppingViews;
}

export const initShoppingStoreState = (state?: ShoppingStoreState): ShoppingStoreState => {
	state ??= {} as ShoppingStoreState;

	state.allGroceryItems = [];
	state.allGroceryItemCategories = [];
	state.allGroceryStores = [];
	state.shoppingLists = [];
	state.userSelections = initNewShoppingList();
	state.viewToggles = initShoppingViews();

	return state;
};
