<template>
	<Transition name="fade" mode="out-in">
		<div v-if="screenToShow === ShoppingScreens.ShoppingLanding" key="loading">
			<ShoppingLanding />
		</div>
		<div v-else-if="screenToShow === ShoppingScreens.SelectGroceryItems" key="select-items">
			<SelectGroceryItems />
		</div>
		<div v-else-if="screenToShow === ShoppingScreens.SelectGroceryStore" key="select-store">
			<SelectGroceryStore />
		</div>
		<div v-else-if="screenToShow === ShoppingScreens.ConfirmShoppingList" key="confirm-list">
			<ConfirmShoppingList />
		</div>
		<div v-else>
			<ProgressSpinner style="height: 50px; width: 50px" />
		</div>
	</Transition>
</template>

<script setup lang="ts">
	// Select Ingredients

	// Select a grocery store

	import { useShoppingStore } from '@composables/use-shopping-store';
	import { ShoppingScreens } from '@models/views';
	import ShoppingLanding from './shopping-landing.vue';
	import SelectGroceryItems from './select-grocery-items.vue';
	import SelectGroceryStore from './select-grocery-store.vue';
	import ConfirmShoppingList from './confirm-shopping-list.vue';
	import ProgressSpinner from 'primevue/progressspinner';

	const { screenToShow, shoppingStore } = useShoppingStore();
</script>
