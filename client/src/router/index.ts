import { authStore } from '@store/auth-store';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: () => import('@router/views/sign-up.vue'),
			meta: {
				authRequired: false
			}
		},
		{
			path: '/admin',
			name: 'adminHome',
			component: () => import('@router/views/admin-home.vue'),
			meta: {
				authRequired: true
			}
		},
		{
			path: '/add-grocery-store',
			name: 'addGroceryStore',
			component: () => import('@router/views/add-grocery-store.vue'),
			meta: {
				authRequired: true
			}
		},
		{
			path: '/add-grocery-item',
			name: 'addGroceryItem',
			component: () => import('@router/views/add-grocery-store-item.vue'),
			meta: {
				authRequired: true
			}
		},
		{
			path: '/shopping',
			name: 'shoppingHome',
			component: () => import('@router/views/shopping.vue'),
			meta: {
				authRequired: false
			}
		},
		{ path: '/:catchAll(.*)', component: () => import('@views/_404.vue') }
	]
});

router.beforeResolve(() => {
	document.querySelector('body')?.scrollIntoView();
});

router.beforeEach((to, from) => {
	if (to.meta.authRequired) {
		// TODO: figure out the auth on the routes
		// authStore.setIsAuthorized();
		// debugger;
		// if (!authStore.isAuthenticated) {
		// 	return { name: 'home' };
		// }
		return;
	} else {
		return;
	}
});

export default router;
