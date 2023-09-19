import type { ToastMessageOptions } from 'primevue/toast';

export interface MessageStoreState {
	toastMessage?: ToastMessageOptions;
}

export const initMessageStoreState = (messageState?: MessageStoreState): MessageStoreState => {
	messageState ??= {} as MessageStoreState;

	messageState.toastMessage = undefined;

	return messageState;
};
