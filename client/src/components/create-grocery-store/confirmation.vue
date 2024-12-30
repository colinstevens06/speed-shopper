<template>
	<div>
		<h2 class="text-xl">Confirm Selections</h2>
		<h3 class="text-lg mt-3">{{ newGroceryStore.groceryStoreName }}</h3>
		<div class="mt-3">
			<AddressDisplay />
		</div>
		<div class="mt-3">
			<AislesDisplay />
		</div>
		<div>
			<Button label="Submit New Grocery Store" class="max-w-max mr-2" @click="handleSubmitClick" />
			<Button label="Back" class="max-w-max p-button-outlined mt-3" @click="handleBackClick" />
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useCreateGroceryStoreState } from '@composables/use-create-grocery-store-state';
	import { CreateGroceryStoreScreens } from '@models/index';
	import { formatCategories } from '@utils/formatters';
	import Button from 'primevue/button';
	import { ref } from 'vue';
	import AddressDisplay from '@components/create-grocery-store/address-display.vue';
	import AislesDisplay from '@components/create-grocery-store/aisles-display.vue';
	import { messageStore } from '@store/message-store';

	const { aisles, categoryOptions, newGroceryStore, createGroceryStoreStore, viewToggles } =
		useCreateGroceryStoreState();

	const submitInProgress = ref(false);

	const handleBackClick = () => {
		viewToggles.value.screenToShow = CreateGroceryStoreScreens.Aisles;
	};

	const handleSubmitClick = async () => {
		submitInProgress.value = true;

		const response = await createGroceryStoreStore.submitNewGroceryStore();
		if (response) {
			messageStore.setSuccessMessage('Grocery store created successfully!');
		} else {
			messageStore.setDangerMessage('Save failed. Please try again later.');
		}
		submitInProgress.value = false;
	};
</script>
