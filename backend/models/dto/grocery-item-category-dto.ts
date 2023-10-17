import { GroceryItem } from '@db/models/grocery-item';
import { GroceryItemCategory } from '@db/models/grocery-item-category';

export interface GroceryItemCategoryDto {
	groceryItemCategoryId: number;
	name: string;
	updateby: string;
	groceryItems: GroceryItem[];
}

export const initGroceryItemCategoryDto = (cat: GroceryItemCategory, items: GroceryItem[]): GroceryItemCategoryDto => {
	const state = {} as GroceryItemCategoryDto;

	state.groceryItemCategoryId = cat.groceryItemCategoryId;
	state.name = cat.name;
	state.updateby = cat.updateby;
	state.groceryItems = [...items];

	return state;
};

