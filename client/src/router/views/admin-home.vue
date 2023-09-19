<template>
	<Layout>
		<h2>I want to create:</h2>
		<ul>
			<li><router-link :to="{ name: 'addGroceryStore' }">A Store</router-link></li>
			<li><router-link :to="{ name: 'addGroceryItem' }">A Grocery Item</router-link></li>
		</ul>
		<h2 class="mt-3">I want to edit:</h2>
		<ul>
			<li>A Store</li>
			<li>A Grocery Item</li>
		</ul>
		<h2 class="mt-3">Cache</h2>
		<Button label="Clear Server Cache (All)" @click="clearAllCache" />
	</Layout>
</template>

<script setup lang="ts">
	import { contextStore } from '@store/context-store';
	import Layout from '../layouts/main.vue';
	import Button from 'primevue/button';
	import { messageStore } from '@store/message-store';

	const clearAllCache = async () => {
		const response = await contextStore.clearServerSideCache();
		if (response.includes('success')) {
			messageStore.setSuccessMessage(response);
		} else {
			messageStore.setDangerMessage(response);
		}
	};
</script>
