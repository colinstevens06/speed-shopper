<template>
	<div>
		<h2 class="text-xl">Aisles</h2>
		<p>Add aisle for this store. You can reorder them after adding.</p>
		<h3 class="text-lg mt-3">{{ newGroceryStore.groceryStoreName }}</h3>
		<AddressDisplay />
		<div class="grid mt-3">
			<!-- Aisle Creation -->
			<div class="col-12 md:col-8">
				<AddAisle />
			</div>
			<!-- Built Aisles -->
			<div v-if="aisles.length > 0" class="col-12 md:col-4 pl-3 pt-3">
				<AislesDisplay />
			</div>
			<!-- Submit Buttons -->
			<div class="col-12">
				<Button label="Done Adding Aisles" class="max-w-max mr-2" @click="handleContinueClick" />
				<Button label="Back to Address" class="max-w-max p-button-outlined" @click="handleBackClick" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useCreateGroceryStoreState } from '@composables/use-create-grocery-store-state';
	import { initAisle, type Aisle, type GroceryItemCategory } from '@models/store-builder';
	import { CreateGroceryStoreScreens } from '@models/views';
	import Button from 'primevue/button';
	import { computed, reactive, ref } from 'vue';
	import InputText from 'primevue/inputtext';
	import Checkbox from 'primevue/checkbox';
	import { formatCategories } from '@utils/formatters';
	import AddressDisplay from '@components/create-grocery-store/address-display.vue';
	import AislesDisplay from '@components/create-grocery-store/aisles-display.vue';
	import AddAisle from '@components/create-grocery-store/add-aisle.vue';

	const { aisles, categoryOptions, newGroceryStore, createGroceryStoreStore, viewToggles } =
		useCreateGroceryStoreState();

	const categorySearch = ref('');
	const newAisleBindings = reactive(initAisle());

	const filteredCategories = computed(() =>
		categoryOptions.value.filter(cat => cat.name.toLowerCase().includes(categorySearch.value.toLowerCase()))
	);

	const addAisle = () => {
		const aisleCopy = { ...newAisleBindings } as Aisle;
		aisleCopy.aisleOrder = newGroceryStore.value.aisles.length + 1;
		newGroceryStore.value.aisles.push(aisleCopy);
	};

	const handleBackClick = () => {
		viewToggles.value.screenToShow = CreateGroceryStoreScreens.Address;
	};

	const handleContinueClick = () => {
		viewToggles.value.screenToShow = CreateGroceryStoreScreens.Confirmation;
	};

	const handleAddAisleClick = () => {
		addAisle();
		resetAisleBindings();
	};

	const resetAisleBindings = () => {
		Object.assign(newAisleBindings, initAisle());
	};

	const init = async () => {
		await createGroceryStoreStore.getCategories();
	};

	init();
</script>
