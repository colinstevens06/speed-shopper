<script lang="ts" setup>
	// Select Ingredients

	// Select a grocery store

	import { useShoppingStore } from '@composables/use-shopping-store';
	import { ShoppingScreens } from '@models/views';
	import Button from 'primevue/button';

	const { screenToShow, shoppingStore, shoppingLists } = useShoppingStore();
	const handleCreateShoppingListClick = () => {
		// switch to show the ingredients list
		shoppingStore.viewToggles.screenToShow = ShoppingScreens.SelectGroceryItems;
	};

	const handleOldShoppingListClick = (shoppingListId: number) => {
		// allow user to edit items
	};

	const init = async () => {
		await shoppingStore.loadShoppingLists();
	};

	init();
</script>

<template>
	<template v-if="shoppingLists.length">
		<Button label="Create a shopping list" link class="m-0 p-0" @click="handleCreateShoppingListClick" />
		<h2 class="text-lg mt-3">Start with a recent shopping list</h2>
		<ul>
			<template v-for="item in shoppingLists" :key="item">
				<li>
					<Button
						:label="item.name"
						text
						link
						class="p-0 m-0"
						@click="handleOldShoppingListClick(item.shoppingListId ?? -1)"
					/>
				</li>
			</template>
		</ul>
	</template>
</template>
