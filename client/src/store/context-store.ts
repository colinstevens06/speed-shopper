import { contextStoreService } from '@services/context-store-service';

class ContextStore {
	async clearServerSideCache(): Promise<string> {
		const message = await contextStoreService.clearServerSideCache();
		return message;
	}
}

const contextStore = new ContextStore();

export { contextStore, ContextStore };
