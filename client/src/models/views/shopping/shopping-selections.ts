export interface ShoppingUserSelections {
	groceryItems: number[];
	groceryStoreId: number;
}

export const initShoppingUserSelections = (state?: ShoppingUserSelections): ShoppingUserSelections => {
	state ??= {} as ShoppingUserSelections;

	state.groceryItems = [];
	state.groceryStoreId = -1;

	return state;
};
