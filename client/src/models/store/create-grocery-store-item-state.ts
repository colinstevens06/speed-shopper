import {
	initGroceryItemCategory,
	type GroceryItem,
	type GroceryItemCategory,
	initGroceryItem
} from '@models/store-builder';

export interface CreateGroceryStoreItemState {
	categoryOptions: GroceryItemCategory[];
	groceryItemOptions: GroceryItem[];
	newGroceryItem: GroceryItem;
	newCategory: GroceryItemCategory;
}

export const initCreateGroceryStoreItemState = (
	itemState?: CreateGroceryStoreItemState
): CreateGroceryStoreItemState => {
	itemState ??= {} as CreateGroceryStoreItemState;

	itemState.categoryOptions = [];
	itemState.groceryItemOptions = [];
	itemState.newCategory = initGroceryItemCategory();
	itemState.newGroceryItem = initGroceryItem();

	return itemState;
};
