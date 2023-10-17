<template>
	<h1>Select Grocery Store</h1>
	<div class="grid mt-3">
		<div v-for="item in shoppingStore.allGroceryStores" :key="item.groceryStoreId" class="col-12 md:col-4 pr-3">
			<div class="p-card px-4 py-2 grocery-store__card" tabindex="0" @click="handleCardClick(item.groceryStoreId)">
				<h3 class="text-lg">{{ item.groceryStoreName }}</h3>
				<p>
					{{ item.address.addressLineOne }}
					<template v-if="item.address.addressLineTwo">
						<br />
						{{ item.address.addressLineTwo }}
					</template>
				</p>
				<p>{{ item.address.city }}, {{ item.address.zip }} {{ item.address.state }}</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useShoppingStore } from '@composables/use-shopping-store';
	import { ShoppingScreens } from '@models/index';

	const { screenToShow, shoppingStore } = useShoppingStore();

	const handleCardClick = (groceryStoreId: number) => {
		shoppingStore.viewToggles.screenToShow = ShoppingScreens.ConfirmShoppingList;
		shoppingStore.userSelections.groceryStoreId = groceryStoreId;

		// set the selection
		// generate the list
		// switch to the confirm page and ask if they want to save it
	};
</script>
