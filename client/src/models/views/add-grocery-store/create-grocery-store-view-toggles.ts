import { CreateGroceryStoreScreens } from './add-grocery-store-screens';

export interface CreateGroceryStoreViewToggles {
	screenToShow?: CreateGroceryStoreScreens;
}

export const initCreateGroceryStoreViewToggles = (
	viewToggles?: CreateGroceryStoreViewToggles
): CreateGroceryStoreViewToggles => {
	viewToggles ??= {} as CreateGroceryStoreViewToggles;

	viewToggles.screenToShow = CreateGroceryStoreScreens.GeneralInfo;

	return viewToggles;
};
