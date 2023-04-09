<template>
	<Layout>
		<h1>Speed Shopper</h1>
		<ul class="no-list">
			<li><router-link :to="{ name: 'addGroceryStore' }">Add a Grocery Store</router-link></li>
		</ul>
	</Layout>
</template>

<script setup lang="ts">
	import Layout from '../layouts/main.vue';
</script>
