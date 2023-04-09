import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: () => import('./views/home.vue')
		},
		{
			path: '/add-grocery-store',
			name: 'addGroceryStore',
			component: () => import('./views/add-grocery-store.vue')
		},

		{ path: '/:catchAll(.*)', component: () => import('./views/_404.vue') }
	]
});

router.beforeResolve(() => {
	document.querySelector('body')?.scrollIntoView();
});

export default router;
