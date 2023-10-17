import { initShoppingList, type ShoppingList } from '@models/user';
import { useShoppingStore } from './use-shopping-store';
import { computed } from 'vue';
import { initAisle, type Aisle, type GroceryItem } from '@models/index';

export const useShoppingListBuilder = () => {
	const { screenToShow, shoppingStore } = useShoppingStore();

	const createShoppingList = (groceryStoreId: number): ShoppingList => {
		const shoppingList = {} as ShoppingList;

		const groceryStore = shoppingStore.allGroceryStores.find(store => store.groceryStoreId === groceryStoreId);

		shoppingList.groceryItems = getSelectedGroceryItems.value;

		// NEXT now put it in order for the selected store

		return shoppingList;
	};

	const userSelections = computed(() => shoppingStore.userSelections);

	const getSelectedGroceryItems = computed(() => {
		let groceryItems: GroceryItem[] = [];
		shoppingStore.allGroceryItemCategories.forEach(category => {
			const selectedItems = category.groceryItems?.filter(item => item.selectedForList);
			if (selectedItems) groceryItems = [...groceryItems, ...selectedItems];
		});
		return groceryItems;
	});

	const getSelectedStoresAisles = computed(
		() =>
			shoppingStore.allGroceryStores.find(store => store.groceryStoreId === userSelections.value.groceryStoreId)?.aisles
	);

	// Might have to change this to a function which take inputs
	const getOrderedShoppingList = computed(() => {
		const newShoppingList = initShoppingList();

		// needs to go through the selected items and put them in the appropriate aisle order for the store selected
		getSelectedGroceryItems.value.forEach(groceryItem => {
			// find the aisle the item is in
			const aisle = getSelectedStoresAisles.value?.find(aisle =>
				aisle.categories?.find(
					aisleCategory => aisleCategory.groceryItemCategoryId === groceryItem.groceryItemCategoryId
				)
			);

			// see if the aisle is already in our list
			const aisleIndex = newShoppingList.aisles.findIndex(listAisle => listAisle.aisleOrder === aisle?.aisleOrder);

			// if it is add it
			if (aisleIndex >= 0) {
				newShoppingList.aisles[aisleIndex].items?.push(groceryItem);
				// if not create the aisle and add the item
			} else {
				const newAisle = initAisle();
				newAisle.name = aisle?.name ?? '';
				newAisle.items = [];
				newAisle.aisleOrder = aisle?.aisleOrder ?? -1;
				newAisle.items.push(groceryItem);
				newShoppingList.aisles.push(newAisle);
			}
		});
		// item is built
		// SORT aisles by aisleOrder
		newShoppingList.aisles.sort((a, b) => {
			return a.aisleOrder - b.aisleOrder;
		});
		// SORT items to move shopped-for items to the end
		newShoppingList.aisles.forEach(aisle => aisle.items?.sort((a, b) => Number(a.isInCart) - Number(b.isInCart)));

		return newShoppingList;
	});

	return { createShoppingList, getSelectedGroceryItems, getOrderedShoppingList };
};

