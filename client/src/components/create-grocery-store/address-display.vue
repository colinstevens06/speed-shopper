<template>
	<p>
		{{ newGroceryStore.addressLineOne }}
		<span v-if="newGroceryStore.addressLineTwo">
			<br />
			{{ newGroceryStore.addressLineTwo }}
		</span>
		<br />
		{{ newGroceryStore.city }}, {{ newGroceryStore.state }} {{ newGroceryStore.zip }}
	</p>
</template>

<script setup lang="ts">
	import { useCreateGroceryStoreState } from '@composables/use-create-grocery-store-state';

	const { aisles, categoryOptions, newGroceryStore, createGroceryStoreStore, viewToggles } =
		useCreateGroceryStoreState();
</script>
