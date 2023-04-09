<template>
	<div class="speed-shopper-main">
		<main class="main-container" :class="props.class">
			<slot />
		</main>
	</div>
</template>

<script setup lang="ts">
	// import Nav from '@/components/layout/nav.vue';
	// import Footer from '@components/layout/footer.vue';

	const props = defineProps<{ class?: string }>();
</script>
