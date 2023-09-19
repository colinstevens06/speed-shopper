import { GroceryStoreName } from '@db/models/grocery-store-name';

export const groceryStoreNameCache = () => {
	const findAll = async () => {
		let allGroceryNames = [] as GroceryStoreName[];
		try {
			allGroceryNames = await GroceryStoreName.findAll();
		} catch (error: any) {
			console.error(error);
		}
		return allGroceryNames;
	};

	return { findAll };
};
