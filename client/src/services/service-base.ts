import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { ApiResponse } from '@models/services';
import { authStore } from '@store/auth-store';

// const baseURL = '/api';
// todo: this needs to be updated to hit a dynamic URL!
const baseURL = 'http://localhost:3000/api';

export default class ServiceBase {
	protected repo: AxiosInstance;

	constructor() {
		this.repo = axios.create({ baseURL });
		this.initializeInterceptors(this.repo);
	}

	async get<T>(path: string, defaultValue?: T): Promise<T> {
		const response = this.repo
			.get<ApiResponse>(path)
			.then(response => {
				return response.data;
			})
			.catch((_error: any) => {
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

	initializeInterceptors(repo: AxiosInstance) {
		repo.interceptors.request.use(config => {
			config.headers.Authorization = `Bearer ${authStore.clerkToken}`;
			return config;
		});
	}
}
