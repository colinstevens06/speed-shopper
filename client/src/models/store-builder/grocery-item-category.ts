import type { SequelizeBase } from '@models/base';
import type { GroceryItem } from './grocery-item';

export interface GroceryItemCategory extends SequelizeBase {
	groceryItemCategoryId?: number;
	groceryItems?: GroceryItem[];
	name: string;
}

export const initGroceryItemCategory = (initItem?: GroceryItemCategory): GroceryItemCategory => {
	initItem ??= {} as GroceryItemCategory;

	initItem.name = initItem.name ?? '';
	initItem.groceryItemCategoryId = initItem.groceryItemCategoryId ?? -1;
	initItem.groceryItems = initItem.groceryItems ?? [];

	return initItem;
};
