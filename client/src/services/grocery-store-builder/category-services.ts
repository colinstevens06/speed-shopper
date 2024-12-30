import type { PostResult } from '@models/dto';
import type { GroceryItemCategory } from '@models/store-builder';
import ServiceBase from '@services/service-base';

class GroceryItemCategoryService extends ServiceBase {
	//
	baseUrl = `/grocery-item-categories`;

	async create(name: string): Promise<PostResult<GroceryItemCategory>> {
		const dto = { name };
		return await this.post(this.baseUrl, dto);
	}
	async getAll(): Promise<GroceryItemCategory[]> {
		return await this.get<GroceryItemCategory[]>(this.baseUrl);
	}
}

const groceryItemCategoryService = new GroceryItemCategoryService();

export { groceryItemCategoryService, GroceryItemCategoryService };
