<script lang="ts" setup>
	import { useShoppingListBuilder } from '@composables/use-shopping-list-builder';
	import Button from 'primevue/button';
	import { nextTick, ref } from 'vue';
	import Checkbox from 'primevue/checkbox';
	import ShoppingItem from './shopping-item.vue';

	const { getOrderedShoppingList } = useShoppingListBuilder();

	const isShoppingMode = ref(false);

	const handleGoShoppingClick = () => {
		// // this triggers a save to db and takes it to shopping mode
		isShoppingMode.value = true;
	};

	const handleItemClick = (id: number) => {
		// debugger;
		const aisleIndex = getOrderedShoppingList.value.aisles.findIndex(aisle => aisle.aisleOrder === id);

		getOrderedShoppingList.value.aisles[aisleIndex].items
			?.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
			.sort((a, b) => Number(a.isInCart) - Number(b.isInCart));
	};
</script>

<template>
	<h2>Confirm List</h2>
	<!-- <template v-if="isShoppingMode"></template>
	<template v-else> -->
	<template v-for="aisle in getOrderedShoppingList.aisles" :key="aisle.aisleOrder">
		<ShoppingItem :aisle="aisle" :is-shopping-mode="isShoppingMode" @itemClick="handleItemClick" />
	</template>
	<!-- </template> -->
	<div class="mt-3">
		<template v-if="!isShoppingMode">
			<Button label="Save and Go Shopping" class="mr-2" @click="handleGoShoppingClick" />
			<Button label="Save For Later" />
		</template>
	</div>
</template>

