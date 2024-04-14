import {
	initGroceryStore,
	type GroceryStore,
	type GroceryStoreName,
	type GroceryItemCategory
} from '@models/store-builder';
import { initCreateGroceryStoreViewToggles, type CreateGroceryStoreViewToggles } from '@models/views';

export interface CreateGroceryStoreState {
	categoryOptions: GroceryItemCategory[];
	groceryStoreNameOptions: GroceryStoreName[];
	newGroceryStore: GroceryStore;
	selectedStoreNameId: number;
	viewToggles: CreateGroceryStoreViewToggles;
}

export const initCreateGroceryStoreState = (storeState?: CreateGroceryStoreState): CreateGroceryStoreState => {
	storeState ??= {} as CreateGroceryStoreState;

	storeState.categoryOptions = [];
	storeState.groceryStoreNameOptions = [];
	storeState.newGroceryStore = initGroceryStore();
	storeState.viewToggles = initCreateGroceryStoreViewToggles();

	return storeState;
};
