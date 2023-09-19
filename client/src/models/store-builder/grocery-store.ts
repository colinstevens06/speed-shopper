import type { Aisle } from './aisle';

export interface GroceryStore {
	addressLineOne: string;
	addressLineTwo: string;
	aisles: Aisle[];
	city: string;
	groceryStoreId: number;
	name: string;
	state: string;
	zip?: number;
}

export const initGroceryStore = (store?: GroceryStore): GroceryStore => {
	if (!store) {
		store = {} as GroceryStore;
		store.addressLineOne = '';
		store.addressLineTwo = '';
		store.aisles = [];
		store.city = '';
		store.groceryStoreId = 0;
		store.name = '';
		store.state = '';
	}

	return store;
};
