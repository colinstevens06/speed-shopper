import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'adminHome',
			component: () => import('@router/views/admin-home.vue')
		},
		{
			path: '/add-grocery-store',
			name: 'addGroceryStore',
			component: () => import('@router/views/add-grocery-store.vue')
		},
		{
			path: '/add-grocery-item',
			name: 'addGroceryItem',
			component: () => import('@router/views/add-grocery-store-item.vue')
		},

		{ path: '/:catchAll(.*)', component: () => import('@views/_404.vue') }
	]
});

router.beforeResolve(() => {
	document.querySelector('body')?.scrollIntoView();
});

export default router;
