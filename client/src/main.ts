import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';

import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

import 'primeflex/primeflex.css';
import './styles/index.scss';
import { initUserFromClerk } from '@models/user';
import { authStore } from '@store/auth-store';
import { clerk } from '@utils/clerk';
import { VueCookieNext } from 'vue-cookie-next';

(async () => {
	const app = createApp(App);

	// app.u

	// await clerk.load({
	// 	// Set load options here...
	// });
	// // await window.Clerk?.load();
	// const clerkUser = await clerk?.user;
	// if (clerkUser) {
	// 	const user = initUserFromClerk(
	// 		clerkUser.id,
	// 		clerkUser.primaryEmailAddress?.emailAddress ?? '',
	// 		clerkUser.firstName ?? '',
	// 		clerkUser.lastName ?? ''
	// 	);

	// 	authStore.setUser(user);
	// }
	app.use(VueCookieNext);

	VueCookieNext.config({ expire: '7d' });

	app.use(router);
	app.use(PrimeVue);
	app.use(ToastService);
	app.mount('#app');
})();
