import type CreateGroceryStoreItemStore from '@store/views/create-grocery-store-item-store';
import { computed, inject } from 'vue';

export const useCreateGroceryItemStoreState = () => {
	const createGroceryStoreItemStore = inject('createGroceryStoreItemStore') as CreateGroceryStoreItemStore;

	const categoryOptions = computed(() =>
		createGroceryStoreItemStore.categoryOptions.sort((a, b) => a.name.localeCompare(b.name))
	);

	const groceryItemOptions = computed(() =>
		createGroceryStoreItemStore.groceryItemOptions.sort((a, b) => a.name.localeCompare(b.name))
	);

	const newCategory = computed(() => createGroceryStoreItemStore.newCategory);

	const newGroceryItem = computed(() => createGroceryStoreItemStore.newGroceryItem);

	return { categoryOptions, groceryItemOptions, createGroceryStoreItemStore, newCategory, newGroceryItem };
};
