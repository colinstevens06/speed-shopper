<template>
	<Layout>
		<ContentWrapper />
	</Layout>
</template>

<script setup lang="ts">
	import Layout from '../layouts/main.vue';
	import ContentWrapper from '@components/create-grocery-store-item/wrapper.vue';

	import CreateGroceryStoreItemStore from '@store/views/create-grocery-store-item-store';
	import { provide } from 'vue';

	const init = async () => {
		const createGroceryStoreItemStore = new CreateGroceryStoreItemStore();
		provide('createGroceryStoreItemStore', createGroceryStoreItemStore);
		await createGroceryStoreItemStore.getAllOptions();
	};

	init();
</script>
