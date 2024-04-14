<template>
	<div class="grid p-fluid">
		<!-- Category -->
		<div class="col-12 md:col-6">
			<CreateCategory />
		</div>
		<!-- Grocery Item -->
		<div class="col-12 md:col-6">
			<CreateGroceryItem />
		</div>
	</div>
	<Button label="Admin Home" class="p-button-outlined" @click="handleAdminHomeClick" />
</template>

<script setup lang="ts">
	import CreateCategory from '@components/create-grocery-store-item/create-category.vue';
	import CreateGroceryItem from '@components/create-grocery-store-item/create-grocery-item.vue';
	import Button from 'primevue/button';
	import { useRouter } from 'vue-router';

	const router = useRouter();

	const handleAdminHomeClick = () => {
		router.push({ name: 'adminHome' });
	};
</script>
