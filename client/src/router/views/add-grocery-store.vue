<template>
	<Layout class="add-grocery-store">
		<ContentWrapper />
	</Layout>
</template>

<script setup lang="ts">
	import Layout from '../layouts/main.vue';
	// Components
	import ContentWrapper from '@components/create-grocery-store/wrapper.vue';
	import { provide } from 'vue';
	import CreateGroceryStoreStore from '@store/create-grocery-store-store';

	const init = async () => {
		const createGroceryStoreStore = new CreateGroceryStoreStore();
		provide('createGroceryStoreStore', createGroceryStoreStore);
		await createGroceryStoreStore.getGroceryStoreNameOptions();
	};

	init();
</script>
