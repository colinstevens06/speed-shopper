<template>
	<div class="speed-shopper-main">
		<Toast position="top-right" group="main-toast" />
		<nav class="p-2 text-center text-2xl">
			<h1>
				<template v-if="route.name === 'adminHome'">Speed Shopper</template>
				<template v-else><router-link :to="{ name: 'adminHome' }" class="m-0 p-0">Speed Shopper</router-link></template>
			</h1>
		</nav>
		<main class="main-container mt-3 py-5" :class="props.class">
			<slot />
		</main>
	</div>
</template>

<script setup lang="ts">
	// import Nav from '@/components/layout/nav.vue';
	// import Footer from '@components/layout/footer.vue';

	import Button from 'primevue/button';
	import Toast from 'primevue/toast';
	import { messageStore } from '@store/message-store';
	import { watchEffect } from 'vue';
	import { useToast } from 'primevue/usetoast';
	import { useRoute } from 'vue-router';

	const route = useRoute();

	const toast = useToast();

	const props = defineProps<{ class?: string }>();

	watchEffect(() => {
		if (messageStore.toastMessage !== undefined) {
			toast.add(messageStore.toastMessage);
			messageStore.clearToastMessage();
		}
	});
</script>
