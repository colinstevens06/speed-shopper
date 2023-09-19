import { initCreateGroceryStoreItemState, type CreateGroceryStoreItemState } from '@models/store';
import {
	initGroceryItemCategory,
	type GroceryItem,
	type GroceryItemCategory,
	type GroceryStoreName,
	initGroceryItem
} from '@models/store-builder';
import { groceryItemCategoryService } from '@services/grocery-store-builder';
import { groceryStoreService } from '@services/grocery-store-service';
import { Store } from '@store/store';

class CreateGroceryStoreItemStore extends Store<CreateGroceryStoreItemState> {
	constructor() {
		super(initCreateGroceryStoreItemState);
	}

	get categoryOptions(): GroceryItemCategory[] {
		return this.state.categoryOptions;
	}

	get groceryItemOptions(): GroceryItem[] {
		return this.state.groceryItemOptions;
	}

	get newCategory(): GroceryItemCategory {
		return this.state.newCategory;
	}

	get newGroceryItem(): GroceryItem {
		return this.state.newGroceryItem;
	}

	// GETS
	async getAllOptions() {
		const groceryItems = await groceryStoreService.getAllGroceryItems();
		const categories = await groceryItemCategoryService.getAll();
		this.state.groceryItemOptions = groceryItems.sort((a, b) => a.name.localeCompare(b.name));
		this.state.categoryOptions = categories.sort((a, b) => a.name.localeCompare(b.name));
	}

	// POSTS
	async postNewCategory(name: string): Promise<GroceryItemCategory> {
		const response = await groceryItemCategoryService.create(name);
		if (response) {
			// Update the state
			this.state.categoryOptions = [...this.state.categoryOptions, response];
		}
		return response;
	}

	async postNewGroceryItem(name: string, id: number): Promise<GroceryItem> {
		const response = await groceryStoreService.postGroceryItem(name, id);

		if (response) {
			// Update the state
			this.state.groceryItemOptions = [...this.state.groceryItemOptions, response];
			this.state.groceryItemOptions.sort((a, b) => a.name.localeCompare(b.name));
		}
		return response;
	}

	resetNewCategory(): void {
		this.state.newCategory = initGroceryItemCategory();
	}

	resetNewGroceryItem(): void {
		this.state.newGroceryItem = initGroceryItem();
	}
}

export default CreateGroceryStoreItemStore;
