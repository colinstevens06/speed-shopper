<template>
	<Layout>
		<h2>Welcome to Speed Shopper</h2>
		<div class="body-copy">
			<p>
				Speed Shopper is designed to save you time at a task you probably do at least once a week: going to the grocery
				store.
			</p>
			<p :class="mt3">
				Select the ingredients you need, choose the store you're going to, then Speed Shopper will create a list in the
				order they're in as you walk through the store.
			</p>
		</div>
		<div :class="mt3">
			<template v-if="noUser">
				<p class="my-3">Sign up today!</p>
				<Button label="Sign Up" class="mr-2" @click="openSignUpDialog" />
				<Button label="Sign In" @click="openSignInDialog" />
			</template>
			<template v-else>
				<!-- <Button label="Sign In" @click="openSignInDialog" /> -->
				<Button label="Admin Home" class="mr-2" @click="goToAdminHome" />
				<Button label="Go Shopping" to="/shopper" @click="goToShoppingHome" />
			</template>
		</div>
		<div id="sign-up"></div>
		<div id="sign-in"></div>
	</Layout>
</template>

<script setup lang="ts">
	import { authStore } from '@store/auth-store';
	import Layout from '../layouts/main.vue';
	import Button from 'primevue/button';
	import { computed } from 'vue';
	import { useRouter } from 'vue-router';
	import { clerk } from '@utils/clerk';

	const mt3 = 'mt-3';

	const router = useRouter();

	const goToAdminHome = () => {
		router.push({ name: 'adminHome' });
	};

	const goToShoppingHome = () => {
		router.push({ name: 'shoppingHome' });
	};

	const openSignUpDialog = () => {
		clerk?.openSignUp();
	};

	const openSignInDialog = () => {
		clerk?.openSignIn();
	};

	const noUser = computed(() => !authStore.user);

	const initClerkElements = () => {
		const signUpElement = document.getElementById('sign-up');
		const signInElement = document.getElementById('sign-in');

		if (signUpElement) {
			clerk?.mountSignUp(signUpElement as HTMLDivElement);
		}

		if (signInElement) {
			clerk?.mountSignIn(signInElement as HTMLDivElement);
		}
	};

	initClerkElements();
</script>
