export interface NewShoppingList {
	groceryItems: number[];
	groceryStoreId: number;
	shoppingListName: string;
}

export const initNewShoppingList = (state?: NewShoppingList): NewShoppingList => {
	state ??= {} as NewShoppingList;

	state.groceryItems = [];
	state.groceryStoreId = -1;
	state.shoppingListName = new Date().toDateString();

	return state;
};
