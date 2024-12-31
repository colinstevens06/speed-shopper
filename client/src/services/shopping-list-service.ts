import { authStore } from '@store/auth-store';
import ServiceBase from './service-base';
import type { PostResult } from '@models/dto';
import type { ShoppingList } from '@models/user';

class ShoppingListService extends ServiceBase {
	async postShoppingList(name: string, groceryItemIds: number[]): Promise<PostResult<ShoppingList>> {
		const clerkUserId = authStore.user?.clerkUserId;
		const dto = { name, clerkUserId, groceryItemIds };
		return await this.post(`shopping-lists`, dto);
	}

	async getShoppingLists(clerkUserId: string): Promise<ShoppingList[]> {
		return await this.get<ShoppingList[]>(`shopping-lists?clerkUserId=${clerkUserId}`);
	}
}

const shoppingListService = new ShoppingListService();

export { shoppingListService, ShoppingListService };
