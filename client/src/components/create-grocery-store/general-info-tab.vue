<template>
	<div>
		<Dialog v-bind:visible="showDialog" modal :closable="false" @hide="resetDialogState">
			<template #header>New Grocery Store Name</template>
			<InputText v-model.trim="newGroceryStoreName" class="mt-1" />
			<p v-show="showDuplicateNameError" class="invalid-message mt-1">This name already exists in the system.</p>
			<template #footer>
				<Button
					label="Add Grocery Name"
					@click="handleAddGroceryItemClick"
					:disabled="!newGroceryStoreName || submitInProgress"
				/>
				<Button label="Cancel" @click="toggleShowDialog" class="p-button-outlined" :disabled="submitInProgress" />
			</template>
		</Dialog>
		<h2 class="text-xl">General Info</h2>
		<p class="mb-3 py-1">
			Select the store you want to build a new store for. Can't find the store name you're looking for? Please add it.
		</p>
		<template v-if="showStoreNameSearch">
			<label class="mt-3">Search by name</label>
			<InputText v-model.trim="nameSearch" placeholder="Search for a store name" />
			<br />
		</template>
		<Button label="Add a new store name +" :class="{ 'mt-2': showStoreNameSearch }" @click="toggleShowDialog" />
		<div class="mt-4 p-3 surface-200 grid add-grocery-store__names-list">
			<template v-for="(storeName, index) in filteredStoreNames" :key="storeName.groceryStoreNameId">
				<div class="col-12 md:col-3" :class="{ 'mt-3': index > 3 }">
					<Button :label="storeName.name" link @click="handleSelectName(storeName)" />
				</div>
			</template>
		</div>
		<Button label="Admin Home" class="p-button-outlined mt-3" @click="handleBackToAdmin" />
	</div>
</template>

<script setup lang="ts">
	import { useCreateGroceryStoreState } from '@composables/use-create-grocery-store-state';
	import InputText from 'primevue/inputtext';
	import Button from 'primevue/button';
	import Dialog from 'primevue/dialog';
	import { computed, ref } from 'vue';
	import { messageStore } from '@store/message-store';
	import { CreateGroceryStoreScreens } from '@models/views';
	import { useRouter } from 'vue-router';
	import type { GroceryStoreName } from '@models/index';

	const { createGroceryStoreStore, newGroceryStore, viewToggles } = useCreateGroceryStoreState();
	const router = useRouter();

	const nameSearch = ref('');
	const newGroceryStoreName = ref('');
	const showDialog = ref(false);
	const showDuplicateNameError = ref(false);
	const submitInProgress = ref(false);

	const filteredStoreNames = computed(() => {
		return storeNameOptions.value
			.filter(storeName => storeName.name.toLowerCase().includes(nameSearch.value.toLowerCase()))
			.sort((a, b) => a.name.localeCompare(b.name));
	});

	const showStoreNameSearch = computed(() => storeNameOptions.value.length > 10);

	const storeNameOptions = computed(() => createGroceryStoreStore.groceryStoreNameOptions);

	const checkForDuplicateName = () => {
		let duplicate = false;
		storeNameOptions.value.some(option => {
			if (option.name.toLowerCase() === newGroceryStoreName.value.toLowerCase()) {
				duplicate = true;
				return;
			}
		});
		return duplicate;
	};

	const handleAddGroceryItemClick = async () => {
		showDuplicateNameError.value = false;
		// Only attempt to add if it's not in the current list
		const isDuplicate = checkForDuplicateName();
		if (!isDuplicate) {
			submitInProgress.value = true;
			// Hit the api to add a new item
			const response = await createGroceryStoreStore.postGroceryStoreName(newGroceryStoreName.value);

			if (response) {
				// I agree
				messageStore.setSuccessMessage('Grocery store name added successfully');
				setTimeout(() => {
					showDialog.value = false;
				}, 150);
			} else {
				messageStore.setDangerMessage('There was an error adding the grocery store name');
			}
			submitInProgress.value = false;
		} else {
			// Duplicate
			showDuplicateNameError.value = true;
		}
	};

	const handleBackToAdmin = () => {
		router.push({ name: 'adminHome' });
	};

	const handleSelectName = (storeName: GroceryStoreName) => {
		newGroceryStore.value.groceryStoreName = storeName.name;
		createGroceryStoreStore.selectedStoreNameId = storeName.groceryStoreNameId;

		viewToggles.value.screenToShow = CreateGroceryStoreScreens.Address;
	};

	const toggleShowDialog = () => {
		showDialog.value = !showDialog.value;
	};

	const resetDialogState = () => {
		newGroceryStoreName.value = '';
		showDuplicateNameError.value = false;
	};
</script>
