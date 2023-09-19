import type { GroceryItemCategory, SequelizeBase } from '..';

export interface GroceryItem extends SequelizeBase {
	categories: GroceryItemCategory[];
	groceryItemId?: number;
	name: string;
	groceryItemCategoryId?: number;
}

export const initGroceryItem = (initItem?: GroceryItem): GroceryItem => {
	initItem ??= {} as GroceryItem;

	initItem.categories = [];
	initItem.name = '';

	return initItem;
};
