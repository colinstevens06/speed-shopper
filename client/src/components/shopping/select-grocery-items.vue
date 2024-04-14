<template>
	<div class="flex justify-content-between">
		<h1>Select Grocery Items</h1>
		<Button label="Select Store" @click="handleSelectStoreClick" />
	</div>
	<ShoppingListName />
	<ScrollPanel style="width: 100%; height: 80vh">
		<template v-for="category in shoppingStore.allGroceryItemCategories" :key="category.groceryItemCategoryId">
			<template v-if="category.groceryItems?.length">
				<h2>{{ category.name }}</h2>

				<template v-for="groceryItem in category.groceryItems" :key="groceryItem.groceryItemId">
					<!-- <span>{{ groceryItem.name }}</span> -->
					<ToggleButton
						v-model="groceryItem.selectedForList"
						:on-label="groceryItem.name"
						:off-label="groceryItem.name"
						class="mr-2 mb-2"
					/>
				</template>
			</template>
		</template>
	</ScrollPanel>
</template>

<script setup lang="ts">
	import { useShoppingStore } from '@composables/use-shopping-store';
	import { ShoppingScreens } from '@models/views';

	import Button from 'primevue/button';
	import ScrollPanel from 'primevue/scrollpanel';

	const { screenToShow, shoppingStore } = useShoppingStore();

	import ToggleButton from 'primevue/togglebutton';
	import ShoppingListName from './shopping-list-name.vue';

	const handleSelectStoreClick = () => {
		shoppingStore.viewToggles.screenToShow = ShoppingScreens.SelectGroceryStore;
	};
</script>
