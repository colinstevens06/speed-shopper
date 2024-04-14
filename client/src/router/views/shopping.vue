<template>
	<Layout>
		<Wrapper />
	</Layout>
</template>

<script setup lang="ts">
	import Layout from '@router/layouts/main.vue';
	import Wrapper from '@components/shopping/wrapper.vue';

	// Select Ingredients

	// Select a grocery store
	import { ShoppingStore } from '@store/views/shopping-store';
	import { provide } from 'vue';

	const shoppingStore = new ShoppingStore();

	const init = async () => {
		provide('shoppingStore', shoppingStore);
		await shoppingStore.initView();
	};

	init();
</script>
