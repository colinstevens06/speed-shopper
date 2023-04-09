import type { Aisle } from './aisle';

export interface GroceryStore {
	address: string;
	aisles: Aisle[];
	city: string;
	groceryStoreId: number;
	name: string;
	state: string;
	zip: number;
}

export const initGroceryStore = (store?: GroceryStore): GroceryStore => {
	if (!store) {
		store = {} as GroceryStore;
		store.address = '';
		store.aisles = [];
		store.city = '';
		store.groceryStoreId = 0;
		store.name = '';
		store.state = '';
		store.zip = 0;
	}

	return store;
};
