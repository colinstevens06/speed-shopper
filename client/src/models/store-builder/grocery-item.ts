import type { GroceryItemCategory, SequelizeBase } from '..';

export interface GroceryItem extends SequelizeBase {
	categories: GroceryItemCategory[];
	groceryItemId?: number;
	name: string;
	groceryItemCategoryId?: number;
	selectedForList?: boolean; // Used to track if the item should be on the shopping list
	isInCart: boolean; // Used to track item while shopping
}

export const initGroceryItem = (initItem?: GroceryItem): GroceryItem => {
	initItem ??= {} as GroceryItem;

	initItem.categories = [];
	initItem.name = '';
	initItem.isInCart = false;

	return initItem;
};
