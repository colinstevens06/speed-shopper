import {
	initShoppingStoreState,
	type GroceryItem,
	type ShoppingStoreState,
	type GroceryStore,
	ShoppingScreens,
	type ShoppingViews,
	type GroceryItemCategory,
	initGroceryItemCategory,
	type NewShoppingList
} from '@models/index';
import type { ShoppingList } from '@models/user';
import { groceryItemCategoryService } from '@services/grocery-store-builder';
import { groceryStoreService } from '@services/grocery-store-service';
import { shoppingListService } from '@services/shopping-list-service';
import { authStore } from '@store/auth-store';
import { Store } from '@store/store';

class ShoppingStore extends Store<ShoppingStoreState> {
	constructor() {
		super(initShoppingStoreState);
	}

	get allGroceryItems(): GroceryItem[] {
		return this.state.allGroceryItems;
	}

	get allGroceryItemCategories(): GroceryItemCategory[] {
		return this.state.allGroceryItemCategories;
	}

	get allGroceryStores(): GroceryStore[] {
		return this.state.allGroceryStores;
	}

	get shoppingLists(): ShoppingList[] {
		return this.state.shoppingLists;
	}

	get userSelections(): NewShoppingList {
		return this.state.userSelections;
	}

	get viewToggles(): ShoppingViews {
		return this.state.viewToggles;
	}

	async initView() {
		// await this.loadGroceryItems();
		await this.loadGroceryCategories();
		await this.loadGroceryStores();
		this.state.viewToggles.screenToShow = ShoppingScreens.ShoppingLanding;
	}

	async loadGroceryItems() {
		const response = await groceryStoreService.getAllGroceryItems();
		if (response) {
			this.state.allGroceryItems = response;
		}
	}

	async loadGroceryCategories() {
		const response = await groceryItemCategoryService.getAll();
		if (response) {
			// response.forEach(reItem => {
			// 	const newItem = initGroceryItemCategory(reItem);
			// 	this.state.allGroceryItemCategories.push(newItem);
			// });
			this.state.allGroceryItemCategories = response;
			this.state.allGroceryItemCategories.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
			this.state.allGroceryItemCategories.forEach(category => {
				category.groceryItems?.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
			});
		}
	}

	async loadGroceryStores() {
		const response = await groceryStoreService.getAllGroceryStores();
		if (response) {
			this.state.allGroceryStores = response;
		}
	}

	async loadShoppingLists() {
		const clerkUserId = authStore.user?.clerkUserId ?? '';
		const response = await shoppingListService.getShoppingLists(clerkUserId);
		if (response) {
			this.state.shoppingLists = [...response];
		}
	}

	async postShoppingList(name: string, ids: number[]) {
		const response = await shoppingListService.postShoppingList(name, ids);
		return response;
	}

	setScreenToShow(screen: ShoppingScreens) {
		this.state.viewToggles.screenToShow = screen;
	}
}

export { ShoppingStore };
