import { reactive } from 'vue';

export abstract class Store<T extends Object> {
	protected state: T;
	private initialize: (data?: T) => T;

	constructor(initializer: (data?: T) => T) {
		this.initialize = initializer;
		const data = this.initialize();
		this.state = reactive(data) as T;
	}
}
