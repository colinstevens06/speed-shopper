<template>
	<GeneralInfoTab v-if="viewToggles.screenToShow === CreateGroceryStoreScreens.GeneralInfo" />
	<AddressTab v-else-if="viewToggles.screenToShow === CreateGroceryStoreScreens.Address" />
	<AislesTab v-else-if="viewToggles.screenToShow === CreateGroceryStoreScreens.Aisles" />
	<Confirmation v-else-if="viewToggles.screenToShow === CreateGroceryStoreScreens.Confirmation" />
</template>

<script setup lang="ts">
	import { useCreateGroceryStoreState } from '@composables/use-create-grocery-store-state';
	import { CreateGroceryStoreScreens } from '@models/views';

	import GeneralInfoTab from './general-info-tab.vue';
	import AddressTab from './address-tab.vue';
	import AislesTab from './aisles-tab.vue';
	import Confirmation from './confirmation.vue';

	const { createGroceryStoreStore, viewToggles } = useCreateGroceryStoreState();
</script>
