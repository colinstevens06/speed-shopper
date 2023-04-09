<template>
	<Layout class="add-grocery-store">
		<div class="p-card p-4 mt-5">
			<h1>Add Grocery Store</h1>
			<h2>General Information</h2>
			<div class="grid p-fluid">
				<div class="col-12 md:col-6">
					<label for="name">Name</label>
					<InputText id="name" v-model="newStore.name" />
				</div>
				<div class="col-12 md:col-6">
					<label for="address">Address</label>
					<InputText id="address" v-model="newStore.address" />
				</div>
				<div class="col-12 md:col-6">
					<label for="city">City</label>
					<InputText id="city" v-model="newStore.city" />
				</div>
				<div class="col-12 md:col-6">
					<label for="state">State</label>
					<Dropdown placeholder="Select" v-model="newStore.state" />
				</div>
				<div class="col-12 md:col-6">
					<label for="zip">Zip</label>
					<InputNumber id="zip" v-model="newStore.zip" :min="10000" :max="99999" :use-grouping="false" />
				</div>
			</div>
		</div>
	</Layout>
</template>

<script setup lang="ts">
	import Dropdown from 'primevue/dropdown';
	import InputNumber from 'primevue/inputnumber';
	import InputText from 'primevue/inputtext';
	import Layout from '../layouts/main.vue';

	import { reactive } from 'vue';
	import { initGroceryStore } from '@models/index';

	const newStore = reactive(initGroceryStore());
</script>
