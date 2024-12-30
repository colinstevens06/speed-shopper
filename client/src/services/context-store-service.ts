import ServiceBase from './service-base';

class ContextStoreService extends ServiceBase {
	async clearServerSideCache(): Promise<string> {
		return await this.get<string>(`/cache-clear`);
	}
}

const contextStoreService = new ContextStoreService();

export { contextStoreService, ContextStoreService };
