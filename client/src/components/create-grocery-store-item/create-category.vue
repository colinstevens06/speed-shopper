<template>
	<h2>Add Category</h2>
	<form>
		<InputText
			id="new-category-input"
			placeholder="Use Plural Form, ie Spices"
			v-model.trim="newCategory.name"
			class="mr-2"
		/>
		<p v-show="matchFound" class="invalid-message mt-1">This category already exists.</p>
		<Button
			label="Save Category"
			class="max-w-max mt-2"
			:disabled="matchFound"
			@click.prevent="handleSaveCategoryClick"
			type="submit"
		/>
	</form>
	<template v-if="categoryOptions.length">
		<div class="surface-200">
			<ul class="list-none p-3 mt-3" :style="{ minHeight: minResultsBoxHeight }">
				<template v-for="category in categoriesToDisplayInPaginator" :key="category.groceryItemCategoryId">
					<li class="mt-1">{{ category.name }}</li>
				</template>
			</ul>
			<Paginator
				template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
				:rows="10"
				:totalRecords="categoryOptions.length"
				@page="handleCategoryPageChange"
			/>
		</div>
	</template>
	<template v-else>
		<ProgressSpinner style="height: 50px; width: 50px" />
	</template>
</template>

<script setup lang="ts">
	import { useCreateGroceryItemStoreState } from '@composables/use-create-grocery-item-store-state';
	import { messageStore } from '@store/message-store';
	import Paginator, { type PageState } from 'primevue/paginator';
	import { computed, ref } from 'vue';
	import InputText from 'primevue/inputtext';
	import Button from 'primevue/button';
	import ProgressSpinner from 'primevue/progressspinner';

	const { newCategory, newGroceryItem, categoryOptions, groceryItemOptions, createGroceryStoreItemStore } =
		useCreateGroceryItemStoreState();

	const minResultsBoxHeight = '308px';

	const catIndexStart = ref(0);

	const categoriesToDisplayInPaginator = computed(() =>
		categoriesFilteredByInput.value.slice(catIndexStart.value, catIndexStart.value + 10)
	);

	const categoriesFilteredByInput = computed(() =>
		categoryOptions.value.filter(cat => cat.name.toLowerCase().includes(newCategory.value.name.toLowerCase()))
	);

	const matchFound = computed(() =>
		categoriesFilteredByInput.value.some(cat => cat.name.toLowerCase() === newCategory.value.name.toLowerCase())
	);

	const handleCategoryPageChange = (event: PageState) => {
		const ev = event;
		catIndexStart.value = ev.first;
	};

	const handleSaveCategoryClick = async () => {
		const response = await createGroceryStoreItemStore.postNewCategory(newCategory.value.name);

		if (response) {
			messageStore.setSuccessMessage('Grocery store name added successfully');
			createGroceryStoreItemStore.resetNewCategory();
			document.getElementById('new-category-input')?.focus();
		} else {
			messageStore.setDangerMessage('Save failed. Please try again later.');
		}
	};
</script>
