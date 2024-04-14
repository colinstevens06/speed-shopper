<template>
	<div class="speed-shopper-main">
		<Toast position="top-right" group="main-toast" />
		<nav class="p-2 text-2xl">
			<div class="main-container flex justify-content-between align-items-center">
				<h1 class="mb-0">
					<template v-if="route.name === 'home'">Speed Shopper</template>
					<template v-else>
						<router-link :to="{ name: 'home' }" class="m-0 p-0">Speed Shopper</router-link>
					</template>
				</h1>
				<div id="user-button"></div>
			</div>
		</nav>
		<main class="main-container mt-3 py-5 bg-white border-round-sm" :class="props.class">
			<slot />
		</main>
	</div>
</template>

<script setup lang="ts">
	// import Nav from '@/components/layout/nav.vue';
	// import Footer from '@components/layout/footer.vue';
	import Toast from 'primevue/toast';
	import { messageStore } from '@store/message-store';
	import { onMounted, watchEffect } from 'vue';
	import { useToast } from 'primevue/usetoast';
	import { useRoute, useRouter } from 'vue-router';
	import { authStore } from '@store/auth-store';
	import { clerk } from '@utils/clerk';

	const route = useRoute();
	const router = useRouter();

	const toast = useToast();

	const props = defineProps<{ class?: string }>();

	watchEffect(() => {
		if (messageStore.toastMessage !== undefined) {
			toast.add(messageStore.toastMessage);
			messageStore.clearToastMessage();
		}
	});

	const initClerkElements = () => {
		const signUpElement = document.getElementById('user-button');

		if (signUpElement) {
			clerk?.mountUserButton(signUpElement as HTMLDivElement);
		}
	};

	onMounted(() => {
		initClerkElements();
	});

	const init = async () => {
		if (!authStore.user) await authStore.loadUser();
	};

	await init();
</script>
