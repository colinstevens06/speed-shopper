<template>
	<p>
		{{ newGroceryStore.address.addressLineOne }}
		<span v-if="newGroceryStore.address.addressLineTwo">
			<br />
			{{ newGroceryStore.address.addressLineTwo }}
		</span>
		<br />
		{{ newGroceryStore.address.city }}, {{ newGroceryStore.address.state }} {{ newGroceryStore.address.zip }}
	</p>
</template>

<script setup lang="ts">
	import { useCreateGroceryStoreState } from '@composables/use-create-grocery-store-state';

	const { aisles, categoryOptions, newGroceryStore, createGroceryStoreStore, viewToggles } =
		useCreateGroceryStoreState();
</script>
