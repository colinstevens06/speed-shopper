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
</template>

<script setup lang="ts">
	import CreateCategory from '@components/create-grocery-store-item/create-category.vue';
	import CreateGroceryItem from '@components/create-grocery-store-item/create-grocery-item.vue';
</script>
