<script lang="ts" setup>
	import { useShoppingListBuilder } from '@composables/use-shopping-list-builder';
	import Button from 'primevue/button';
	import { ref } from 'vue';
	import ShoppingItem from './shopping-item.vue';
	import { useShoppingStore } from '@composables/use-shopping-store';
	import { ResultType, type PostResult } from '@models/dto';
	import type { ShoppingList } from '@models/user';
	import { messageStore } from '@store/message-store';
	import ShoppingListName from './shopping-list-name.vue';
	import { ShoppingScreens } from '@models/views';

	const { getOrderedShoppingList, getSelectedGroceryItems } = useShoppingListBuilder();
	const { screenToShow, shoppingStore } = useShoppingStore();

	const isShoppingMode = ref(false);

	const handleBackClick = () => {
		shoppingStore.setScreenToShow(ShoppingScreens.SelectGroceryStore);
	};

	const handleGoShoppingClick = async () => {
		// // this triggers a save to db and takes it to shopping mode
		isShoppingMode.value = true;
		// TODO: save this to the DB
		const response = await saveShoppingList();

		if (response.resultType === ResultType.Success) {
			// Success Toast
			messageStore.setSuccessMessage('Shopping List Saved');
		} else {
			// Error Toast
			messageStore.setDangerMessage('There was an error saving your shopping list');
		}
	};

	const handleItemClick = (id: number) => {
		const aisleIndex = getOrderedShoppingList.value.aisles.findIndex(aisle => aisle.aisleOrder === id);

		getOrderedShoppingList.value.aisles[aisleIndex].items
			?.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
			.sort((a, b) => Number(a.isInCart) - Number(b.isInCart));
	};

	const handleSaveForLater = async () => {
		const response = await saveShoppingList();

		if (response.resultType === ResultType.Success) {
			// Success Toast
			messageStore.setSuccessMessage('Shopping List Saved');
		} else {
			// Error Toast
			messageStore.setDangerMessage('There was an error saving your shopping list');
		}
	};

	const saveShoppingList = async (): Promise<PostResult<ShoppingList>> => {
		const uniqueIds = [
			...new Set(
				getSelectedGroceryItems.value.map(item => {
					if (item.groceryItemId) {
						return item.groceryItemId;
					}
				})
			)
		] as number[];
		const response = await shoppingStore.postShoppingList(shoppingStore.userSelections.shoppingListName, uniqueIds);
		return response;
	};
</script>

<template>
	<h2>Confirm List</h2>

	<template v-if="!isShoppingMode">
		<ShoppingListName />
	</template>
	<template v-else>
		{{ shoppingStore.userSelections.shoppingListName }}
	</template>
	<template v-for="aisle in getOrderedShoppingList.aisles" :key="aisle.aisleOrder">
		<ShoppingItem :aisle="aisle" :is-shopping-mode="isShoppingMode" @itemClick="handleItemClick" />
	</template>
	<div class="mt-3">
		<template v-if="!isShoppingMode">
			<Button label="Save and Go Shopping" class="mr-2" @click="handleGoShoppingClick" />
			<Button label="Save For Later" @click="handleSaveForLater" />
			<Button label="Select Different Store" class="ml-2 p-button-outlined" @click="handleBackClick" />
		</template>
	</div>
</template>
