import type { SequelizeBase } from '@models/base';

export interface GroceryItemCategory extends SequelizeBase {
	groceryItemCategoryId?: number;
	name: string;
}

export const initGroceryItemCategory = (initItem?: GroceryItemCategory): GroceryItemCategory => {
	initItem ??= {} as GroceryItemCategory;

	initItem.name = '';

	return initItem;
};
