import { initMessageStoreState, type MessageStoreState } from '@models/store';
import { Store } from './store';
import type { ToastMessageOptions } from 'primevue/toast';
import { initToastMessage } from '@models/messages';

class MessageStore extends Store<MessageStoreState> {
	constructor() {
		super(initMessageStoreState);
	}

	get toastMessage(): ToastMessageOptions | undefined {
		return this.state.toastMessage;
	}

	clearToastMessage() {
		this.state.toastMessage = undefined;
	}

	setSuccessMessage(summary: string) {
		this.state.toastMessage = { ...initToastMessage(), severity: 'success', summary };
	}

	setWarningMessage(summary: string) {
		this.state.toastMessage = { ...initToastMessage(), severity: 'warn', summary };
	}

	setDangerMessage(summary: string) {
		this.state.toastMessage = { ...initToastMessage(), severity: 'error', summary };
	}

	setToastMessage(toastMessage: ToastMessageOptions) {
		this.state.toastMessage = toastMessage;
	}
}

const messageStore = new MessageStore();

export { messageStore };
