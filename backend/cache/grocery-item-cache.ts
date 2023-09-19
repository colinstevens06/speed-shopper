import { GroceryItem } from '../db/models/grocery-item';

export const groceryItemCache = () => {
	const findAll = async () => {
		let allGroceryItems = [] as GroceryItem[];
		try {
			allGroceryItems = await GroceryItem.findAll();
		} catch (error: any) {
			console.error(error);
		}
		return allGroceryItems;
	};

	return { findAll };
};
