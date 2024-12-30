import type { ToastMessageOptions } from 'primevue/toast';

export const initToastMessage = (toast?: ToastMessageOptions): ToastMessageOptions => {
	toast ??= {} as ToastMessageOptions;

	toast.severity = 'info';
	toast.summary = '';
	toast.closable = true;
	toast.life = 5000;
	toast.group = 'main-toast';

	return toast;
};
