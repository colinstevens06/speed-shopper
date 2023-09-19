import type { Address, Aisle, GroceryItem, GroceryItemCategory, GroceryStoreName } from '@models/store-builder';
import ServiceBase from './service-base';
import type { ApiResponse } from '@models/services';

class GroceryStoreService extends ServiceBase {
	// Grocery Store Name API
	async getAllGroceryStoreNames(): Promise<GroceryStoreName[]> {
		return await this.get<GroceryStoreName[]>(`/grocery-store-names`);
	}
	async postGroceryStoreName(name: string): Promise<GroceryStoreName> {
		const dto = { name };
		return await this.post(`/grocery-store-names`, dto);
	}
	// Grocery Store Items and Categories API
	async getAllGroceryItems(): Promise<GroceryItem[]> {
		return await this.get<GroceryItem[]>(`/grocery-items`);
	}
	async postGroceryItem(name: string, id: number): Promise<GroceryItem> {
		const dto = { name, id: id };
		return await this.post(`/grocery-items`, dto);
	}
	async postNewGroceryStore(dto: { address: Address; nameId: number; aisles: Aisle[] }) {
		return await this.post(`/grocery-stores`, dto);
	}
}

const groceryStoreService = new GroceryStoreService();

export { groceryStoreService, GroceryStoreService };
