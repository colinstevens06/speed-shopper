import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { ApiResponse } from '@models/services';

// const baseURL = '/api';
const baseURL = 'http://localhost:3000/api';

export default class ServiceBase {
	protected repo: AxiosInstance;

	constructor() {
		this.repo = axios.create({ baseURL });
	}

	async get<T>(path: string, defaultValue?: T): Promise<T> {
		const response = this.repo
			.get<ApiResponse>(path)
			.then(response => {
				return response.data;
			})
			.catch((error: any) => {
				return defaultValue;
			});
		// @ts-ignore
		return response;
	}

	async post<T>(path: string, data: any, defaultValue?: T): Promise<T> {
		const response = this.repo
			.post<ApiResponse>(path, data)
			.then(response => {
				// TODO: if error, intercept it here

				// Else, I'll assume sucess and pass the value from the PostResult
				return response.data;
			})
			.catch((error: any) => {
				return defaultValue;
			});
		// @ts-ignore
		return response;
	}

	async put<T>(path: string, data: any, defaultValue?: T): Promise<T> {
		const response = this.repo
			.post<ApiResponse>(path, data)
			.then(response => {
				return response.data;
			})
			.catch((error: any) => {
				console.error(error);
				return defaultValue;
			});
		// @ts-ignore
		return response;
	}
}