<template>
	<h4 class="text-lg">Aisles</h4>
	<template v-for="aisle in aisles" :key="aisle.name">
		<p class="font-semibold mt-2">{{ aisle.name }}</p>
		<p class="text-sm">{{ formatCategories(aisle.categories) }}</p>
	</template>
</template>

<script setup lang="ts">
	import { useCreateGroceryStoreState } from '@composables/use-create-grocery-store-state';
	import { formatCategories } from '@utils/formatters';

	const { aisles, categoryOptions, newGroceryStore, createGroceryStoreStore, viewToggles } =
		useCreateGroceryStoreState();
</script>
