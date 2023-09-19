import type { CreateGroceryStoreState } from '@models/store/create-grocery-store-state';
import type CreateGroceryStoreStore from '@store/create-grocery-store-store';
import { computed, inject } from 'vue';

export const useCreateGroceryStoreState = () => {
	const createGroceryStoreStore = inject('createGroceryStoreStore') as CreateGroceryStoreStore;

	const aisles = computed(() => createGroceryStoreStore.newGroceryStore.aisles);

	const categoryOptions = computed(() =>
		createGroceryStoreStore.categoryOptions.sort((a, b) => a.name.localeCompare(b.name))
	);

	const newGroceryStore = computed(() => createGroceryStoreStore.newGroceryStore);

	const viewToggles = computed(() => createGroceryStoreStore.viewToggles);

	return { aisles, categoryOptions, createGroceryStoreStore, newGroceryStore, viewToggles };
};
