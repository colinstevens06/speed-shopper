<template>
	<h2>Add Grocery Item</h2>
	<form>
		<InputText id="new-grocery-item-input" v-model="newGroceryItem.name" placeholder="Grocery item name" />
		<p v-show="matchFound" class="invalid-message mt-1">This item/category match already exists.</p>
		<Dropdown
			v-model="itemCategorySelection"
			class="mt-2"
			filter
			:options="categoryOptions"
			option-label="name"
			option-value="groceryItemCategoryId"
			placeholder="Select a category"
			@change="handleItemCategorySelectorChange"
		/>
		<Button
			label="Save Grocery Item"
			class="max-w-max mt-2"
			:disabled="matchFound"
			@click.prevent="handleSaveGroceryItemClick"
			type="submit"
		/>
	</form>
	<template v-if="groceryItemsToDisplayInPaginator.length">
		<ul class="list-none p-3 mt-3 surface-200" :style="{ minHeight: minResultsBoxHeight }">
			<template v-for="groceryItem in groceryItemsToDisplayInPaginator" :key="groceryItem.groceryItemId">
				<li class="mt-1">
					{{ groceryItem.name }}
					<span class="text-xs">({{ getCategoryName(groceryItem.groceryItemCategoryId ?? -1) }})</span>
				</li>
			</template>
		</ul>
		<Paginator
			template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
			:rows="10"
			:totalRecords="groceryItemOptions.length"
			@page="handleGroceryItemPageChange"
		/>
	</template>
</template>

<script setup lang="ts">
	import { useCreateGroceryItemStoreState } from '@composables/use-create-grocery-item-store-state';
	import { messageStore } from '@store/message-store';
	import Dropdown, { type DropdownChangeEvent } from 'primevue/dropdown';
	import Paginator, { type PageState } from 'primevue/paginator';
	import { computed, ref } from 'vue';
	import InputText from 'primevue/inputtext';
	import Button from 'primevue/button';
	import { ResultType } from '@models/dto';

	const { newCategory, newGroceryItem, categoryOptions, groceryItemOptions, createGroceryStoreItemStore } =
		useCreateGroceryItemStoreState();

	const minResultsBoxHeight = '308px';

	const itemCategorySelection = ref<number>();

	const groceryItemIndexStart = ref(0);

	const groceryItemsToDisplayInPaginator = computed(() =>
		groceryItemsFilteredByInput.value.slice(groceryItemIndexStart.value, groceryItemIndexStart.value + 10)
	);

	const groceryItemsFilteredByInput = computed(() =>
		groceryItemOptions.value.filter(item => item.name.toLowerCase().includes(newGroceryItem.value.name.toLowerCase()))
	);

	const matchFound = computed(() =>
		groceryItemsFilteredByInput.value.some(
			item =>
				item.name.toLowerCase() === newGroceryItem.value.name.toLowerCase() &&
				newGroceryItem.value.groceryItemCategoryId === item.groceryItemCategoryId
		)
	);

	const getCategoryName = (id: number): string => {
		return categoryOptions.value.find(item => item.groceryItemCategoryId === id)?.name ?? '';
	};

	const handleItemCategorySelectorChange = (event: DropdownChangeEvent) => {
		newGroceryItem.value.groceryItemCategoryId = event.value;
	};

	const handleGroceryItemPageChange = (event: PageState) => {
		const ev = event;
		groceryItemIndexStart.value = ev.first;
	};

	const handleSaveGroceryItemClick = async () => {
		const response = await createGroceryStoreItemStore.postNewGroceryItem(
			newGroceryItem.value.name,
			newGroceryItem.value.groceryItemCategoryId as number
		);

		if (response.resultType === ResultType.Success) {
			messageStore.setSuccessMessage('Grocery item saved successfully');
			createGroceryStoreItemStore.resetNewGroceryItem();
			newGroceryItem.value.groceryItemCategoryId = itemCategorySelection.value;
			document.getElementById('new-grocery-item-input')?.focus();
		} else {
			messageStore.setDangerMessage('Save failed. Please try again.');
		}
	};
</script>
