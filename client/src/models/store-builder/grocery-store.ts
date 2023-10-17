import { type Address, initBlankAddress } from './address';
import type { Aisle } from './aisle';

export interface GroceryStore {
	address: Address;

	aisles: Aisle[];
	groceryStoreId: number;
	groceryStoreName: string;
}

export const initGroceryStore = (store?: GroceryStore): GroceryStore => {
	if (!store) {
		store = {} as GroceryStore;

		store.address = initBlankAddress();
		store.aisles = [];
		store.groceryStoreId = 0;
		store.groceryStoreName = '';
	}

	return store;
};
