import type { ShoppingScreens } from './shopping-screens';

export interface ShoppingViews {
	screenToShow?: ShoppingScreens;
}

export const initShoppingViews = () => {
	return {} as ShoppingViews;
};
