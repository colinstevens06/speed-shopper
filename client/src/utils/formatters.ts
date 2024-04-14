import type { GroceryItemCategory } from '@models/store-builder';

export const formatCategories = (categories: GroceryItemCategory[]) => {
	const categoryNames = categories.map(cat => cat.name).sort();
	return categoryNames.join(', ');
};
