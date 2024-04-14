import { initCreateGroceryStoreState, type CreateGroceryStoreState } from '@models/store/create-grocery-store-state';
import { Store } from './store';
import {
	type Aisle,
	type Address,
	type GroceryItemCategory,
	type GroceryStore,
	type GroceryStoreName,
	initAddressForSubmission
} from '@models/store-builder';
import { groceryStoreService } from '@services/grocery-store-service';
import type { ApiResponse } from '@models/services';
import type { CreateGroceryStoreViewToggles } from '@models/views';
import { groceryItemCategoryService } from '@services/grocery-store-builder';
import { ActionType, ResultType, type PostResult } from '@models/dto';

class CreateGroceryStoreStore extends Store<CreateGroceryStoreState> {
	constructor() {
		super(initCreateGroceryStoreState);
	}

	get categoryOptions(): GroceryItemCategory[] {
		return this.state.categoryOptions;
	}

	get groceryStoreNameOptions(): GroceryStoreName[] {
		return this.state.groceryStoreNameOptions;
	}

	get newGroceryStore(): GroceryStore {
		return this.state.newGroceryStore;
	}

	get selectedStoreNameId(): number {
		return this.state.selectedStoreNameId;
	}

	set selectedStoreNameId(id: number) {
		this.state.selectedStoreNameId = id;
	}

	get viewToggles(): CreateGroceryStoreViewToggles {
		return this.state.viewToggles;
	}

	async getCategories() {
		const categories = await groceryItemCategoryService.getAll();
		this.state.categoryOptions = categories.sort((a, b) => a.name.localeCompare(b.name));
	}

	async getGroceryStoreNameOptions() {
		const names = await groceryStoreService.getAllGroceryStoreNames();
		this.state.groceryStoreNameOptions = names;
	}

	async postGroceryStoreName(name: string): Promise<PostResult<GroceryStoreName>> {
		const response = await groceryStoreService.postGroceryStoreName(name);

		if (response.resultType === ResultType.Success) {
			const groceryStoreName = response.value;
			this.state.groceryStoreNameOptions.push(groceryStoreName);
		}
		return response;
	}

	removeAisleFromList(aisleOrder: number): void {
		const index = this.state.newGroceryStore.aisles.findIndex(aisle => aisle.aisleOrder === aisleOrder);
		this.state.newGroceryStore.aisles.splice(index, 1);
	}

	async submitNewGroceryStore() {
		// Build the DTO
		const dto: { address: Address; nameId: number; aisles: Aisle[] } = {
			address: initAddressForSubmission(
				this.state.newGroceryStore.address.addressLineOne,
				this.state.newGroceryStore.address.city,
				this.state.newGroceryStore.address.state,
				this.state.newGroceryStore.address.zip ?? -1,
				this.state.newGroceryStore.address.addressLineTwo
			),
			nameId: this.state.selectedStoreNameId,
			aisles: this.state.newGroceryStore.aisles
		};
		const response = await groceryStoreService.postNewGroceryStore(dto);

		return response;
	}
}

export default CreateGroceryStoreStore;
