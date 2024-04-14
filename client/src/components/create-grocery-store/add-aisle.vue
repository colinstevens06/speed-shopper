<template>
	<h3>Add an Aisle</h3>
	<label>Aisle Name</label>
	<InputText v-model="newAisleBindings.name" class="mr-2" />
	<Button label="Add Aisle" @click="handleAddAisleClick" />
	<!-- Selected Categories -->
	<div class="text-sm mt-1 pl-2">
		{{ newAisleBindings.categories.map(cat => cat.name).join('; ') }}
	</div>
	<div class="grid p-3 mt-3 surface-200">
		<div class="col-12">
			<label class="w-full">Search For Categories</label>
			<InputText v-model="categorySearch" type="text" />
		</div>
		<template v-for="groceryItem in filteredCategories" :key="groceryItem.groceryItemId">
			<div class="col-12 md:col-6 flex">
				<Checkbox v-model="newAisleBindings.categories" class="mr-1" :value="groceryItem" name="categories" />
				<label class="font-normal">{{ groceryItem.name }}</label>
			</div>
		</template>
	</div>
</template>

<script setup lang="ts">
	import { useCreateGroceryStoreState } from '@composables/use-create-grocery-store-state';
	import { formatCategories } from '@utils/formatters';
	import InputText from 'primevue/inputtext';
	import Checkbox from 'primevue/checkbox';
	import { initAisle, type Aisle } from '@models/index';
	import { ref, reactive, computed } from 'vue';
	import Button from 'primevue/button';

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

	const handleAddAisleClick = () => {
		addAisle();
		resetAisleBindings();
	};

	const resetAisleBindings = () => {
		Object.assign(newAisleBindings, initAisle());
	};
</script>
