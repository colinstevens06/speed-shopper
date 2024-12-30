<script lang="ts" setup>
	import { useShoppingStore } from '@composables/use-shopping-store';
	import InputText from 'primevue/inputtext';
	import Button from 'primevue/button';
	import { ref } from 'vue';

	const { shoppingStore } = useShoppingStore();

	const editMode = ref(false);
</script>

<template>
	<div class="mb-3">
		<template v-if="editMode">
			<InputText v-model="shoppingStore.userSelections.shoppingListName" />
			<Button icon="pi pi-check" size="small" class="ml-1" @click="() => (editMode = false)" />
		</template>

		<template v-else>
			{{ shoppingStore.userSelections.shoppingListName }}
			<Button icon="pi pi-pencil" size="small" @click="() => (editMode = true)" />
		</template>
	</div>
</template>

