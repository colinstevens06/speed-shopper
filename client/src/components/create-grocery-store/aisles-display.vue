<template>
	<ConfirmDialog />
	<h3 class="text-lg">Aisles</h3>
	<VueDraggableNext :list="aisles" @change="handleDragChange">
		<div
			v-for="aisle in aisles"
			:key="aisle.name"
			class="p-2 mb-1 border-1 border-round-sm border-blue-400 cursor-move transition-300"
		>
			<div class="flex justify-content-between align-items-center">
				<h4 class="font-semibold m-0">{{ aisle.name }}</h4>
				<div class="buttons flex justify-content-end">
					<Button size="small" text icon="pi pi-user-edit" class="p-0" @click="handleAisleEdit(aisle.aisleOrder)" />
					<Button size="small" text icon="pi pi-trash" class="p-0" @click="handleRemoveAisle(aisle.aisleOrder)" />
				</div>
			</div>
			<p class="text-sm">{{ formatCategories(aisle.categories) }}</p>
		</div>
	</VueDraggableNext>
</template>

<script setup lang="ts">
	import { useCreateGroceryStoreState } from '@composables/use-create-grocery-store-state';
	import { formatCategories } from '@utils/formatters';
	import { VueDraggableNext } from 'vue-draggable-next';
	import Button from 'primevue/button';
	import { useConfirm } from 'primevue/useconfirm';
	import ConfirmDialog from 'primevue/confirmdialog';

	const confirm = useConfirm();

	const { aisles, categoryOptions, newGroceryStore, createGroceryStoreStore, viewToggles } =
		useCreateGroceryStoreState();

	const handleDragChange = () => {
		updateAisleOrder();
	};

	const handleAisleEdit = (aisleOrder: number) => {
		//
	};

	const handleRemoveAisle = (aisleOrder: number) => {
		createGroceryStoreStore.removeAisleFromList(aisleOrder);
		// UPDATE ALL THE AISLE ORDERS

		// confirm before removing - seems too intrusive so holding off for now ... but definitely want this in the edit view after it's been saved
		// confirm.require({
		// 	header: 'Confirm Removal',
		// 	message: 'Are you sure you want to remove the aisle?',
		// 	accept: () => {
		// 		createGroceryStoreStore.removeAisleFromList(aisleOrder);
		// 	}
		// });
	};
	const updateAisleOrder = () => {
		aisles.value.forEach((aisle, index) => {
			aisle.aisleOrder = index + 1;
		});
	};
</script>
