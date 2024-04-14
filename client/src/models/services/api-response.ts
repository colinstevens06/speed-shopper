import type { ApiException } from './api-exception';

export interface ApiResponse {
	isError: boolean;
	message: string;
	data: any;
	statusCode: number;
	apiException: ApiException;
}
