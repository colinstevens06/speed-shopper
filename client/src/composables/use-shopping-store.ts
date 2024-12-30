import type { ShoppingStore } from '@store/views/shopping-store';
import { computed, inject } from 'vue';

export const useShoppingStore = () => {
	const shoppingStore = inject('shoppingStore') as ShoppingStore;

	const groceryStoreItems = computed(() => shoppingStore.allGroceryItems);

	const screenToShow = computed(() => shoppingStore.viewToggles.screenToShow);

	const shoppingLists = computed(() => shoppingStore.shoppingLists);

	return { groceryStoreItems, screenToShow, shoppingLists, shoppingStore };
};
