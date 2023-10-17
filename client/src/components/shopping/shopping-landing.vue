<script lang="ts" setup>
	// Select Ingredients

	// Select a grocery store

	import { useShoppingStore } from '@composables/use-shopping-store';
	import { ShoppingScreens } from '@models/views';
	import Button from 'primevue/button';

	const { screenToShow, shoppingStore } = useShoppingStore();
	const handleCreateShoppingListClick = () => {
		// switch to show the ingredients list
		shoppingStore.viewToggles.screenToShow = ShoppingScreens.SelectGroceryItems;
	};
</script>

<template>
	<Button label="Create a shopping list" link class="m-0 p-0" @click="handleCreateShoppingListClick" />
	<h2 class="text-lg mt-3">Start with a recent shopping list</h2>
	<ul>
		<li>1</li>
		<li>2</li>
		<li>3</li>
	</ul>
</template>

