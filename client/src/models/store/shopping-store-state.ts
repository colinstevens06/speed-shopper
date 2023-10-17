import type { GroceryItem, GroceryItemCategory, GroceryStore } from '@models/store-builder';
import {
	initShoppingUserSelections,
	initShoppingViews,
	type ShoppingUserSelections,
	type ShoppingViews
} from '@models/views/index';

export interface ShoppingStoreState {
	allGroceryItems: GroceryItem[];
	allGroceryItemCategories: GroceryItemCategory[];
	allGroceryStores: GroceryStore[];
	userSelections: ShoppingUserSelections; // track what the user selects on the different screens
	viewToggles: ShoppingViews;
}

export const initShoppingStoreState = (state?: ShoppingStoreState): ShoppingStoreState => {
	state ??= {} as ShoppingStoreState;

	state.allGroceryItems = [];
	state.allGroceryItemCategories = [];
	state.allGroceryStores = [];
	state.userSelections = initShoppingUserSelections();
	state.viewToggles = initShoppingViews();

	return state;
};
