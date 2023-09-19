import { GroceryStore } from '@db/models/grocery-store';

export const groceryStoreCache = () => {
	const findAll = async () => {
		let allGroceryStores = [] as GroceryStore[];
		try {
			allGroceryStores = await GroceryStore.findAll();
		} catch (error: any) {
			console.error(error);
		}
		return allGroceryStores;
	};

	return { findAll };
};
