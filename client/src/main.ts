import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';

import './styles/index.scss';
import 'primevue/resources/themes/aura-light-blue/theme.css';
// import 'primevue/resources/themes/saga-blue/theme.css';
// import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

import 'primeflex/primeflex.css';
import { VueCookieNext } from 'vue-cookie-next';

(() => {
	const app = createApp(App);

	app.use(VueCookieNext);

	VueCookieNext.config({ expire: '7d' });

	app.use(router);
	app.use(PrimeVue);
	app.use(ConfirmationService);
	app.use(ToastService);
	app.mount('#app');
})();
