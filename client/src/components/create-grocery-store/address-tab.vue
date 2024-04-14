<template>
	<div class="p-fluid">
		<h2 class="text-xl">Address</h2>
		<p class="mb-3 py-1">What's the address for {{ newGroceryStore.groceryStoreName }}?</p>
		<div class="grid">
			<div class="col-12 md:col-6">
				<label for="addresslineone">Address Line 1</label>
				<InputText v-model="newGroceryStore.address.addressLineOne" type="text" id="addresslineone" />
			</div>
			<div class="col-12 md:col-6">
				<label>Address Line 2</label>
				<InputText v-model="newGroceryStore.address.addressLineTwo" type="text" />
			</div>
			<div class="col-12 md:col-6">
				<label>City</label>
				<InputText v-model="newGroceryStore.address.city" type="text" />
			</div>
			<div class="col-12 md:col-6">
				<label>State</label>
				<Dropdown
					v-model="newGroceryStore.address.state"
					:options="states"
					option-value="abbreviation"
					option-label="abbreviation"
				/>
			</div>
			<div class="col-12 md:col-6">
				<label>Zip</label>
				<InputNumber v-model="newGroceryStore.address.zip" :use-grouping="false" placeholder="xxxxx" />
			</div>
		</div>
		<div>
			<Button label="Continue" class="max-w-max mr-2" @click="handleContinueClick" :disabled="!addressComplete" />
			<Button label="Back" class="max-w-max p-button-outlined" @click="handleBackClick" />
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useCreateGroceryStoreState } from '@composables/use-create-grocery-store-state';
	import InputText from 'primevue/inputtext';
	import Dropdown from 'primevue/dropdown';
	import { states } from '@utils/data';
	import InputNumber from 'primevue/inputnumber';
	import Button from 'primevue/button';
	import { CreateGroceryStoreScreens } from '@models/views';
	import { computed } from 'vue';

	const { newGroceryStore, viewToggles } = useCreateGroceryStoreState();

	const addressComplete = computed(
		() =>
			newGroceryStore.value.address.addressLineOne &&
			newGroceryStore.value.address.city &&
			newGroceryStore.value.address.state &&
			newGroceryStore.value.address.zip
	);

	const handleContinueClick = () => {
		viewToggles.value.screenToShow = CreateGroceryStoreScreens.Aisles;
	};

	const handleBackClick = () => {
		viewToggles.value.screenToShow = CreateGroceryStoreScreens.GeneralInfo;
	};
</script>
