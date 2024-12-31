import { Express, Request, Response } from 'express';

export const useBaseApiV1 = (app: Express) => {
	const baseUrl = '/api/v1';

	const healthCheck = () => {
		return app.get(`/health-check`, async (req: Request, res: Response) => {
			res.send('success, z!');
		});
	};

	const apiRoot = () => {
		return app.get(`/api`, async (req: Request, res: Response) => {
			res.send('success, z!');
		});
	};
	const apiV1 = () => {
		return app.get(`${baseUrl}`, async (req: Request, res: Response) => {
			res.send('success, z!');
		});
	};

	healthCheck();
	apiRoot();
	apiV1();
};
