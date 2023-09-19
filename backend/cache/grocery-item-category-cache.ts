import { GroceryItemCategory } from '@db/models/grocery-item-category';

export const groceryItemCategoryCache = () => {
	const findAll = async () => {
		let allGroceryItemCategories = [] as GroceryItemCategory[];
		try {
			allGroceryItemCategories = await GroceryItemCategory.findAll();
		} catch (error: any) {
			console.error(error);
		}
		return allGroceryItemCategories;
	};

	return { findAll };
};
