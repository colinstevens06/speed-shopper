import NodeCache from 'node-cache';
import { NextFunction, Request, Response } from 'express';

export const useVerifyCache = (cache: NodeCache) => {
	const clearCacheKey = async (key: string) => {
		try {
			if (cache.has(key)) {
				console.log(`*** Clearing cached data for key ${key}`);
				cache.del(key);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const verifyCacheInApi = (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;
			const routeUrl = req.url;
			if (cache.has(routeUrl)) {
				console.log(`*** Getting cached data in API layer for url ${routeUrl}`);
				return res.status(200).json(cache.get(routeUrl));
			}
			return next();
		} catch (err: any) {
			throw new Error(err); // TODO: better error handling everywhere
		}
	};

	const verifyCacheInController = async (key: string, callback: () => Promise<any[]>) => {
		try {
			if (cache.has(key)) {
				console.log(`*** Getting cached data in Controller layer for key ${key}`);
				return JSON.parse(cache.get(key)!);
			} else {
				return await callback;
			}
		} catch (err: any) {
			throw new Error(err);
		}
	};

	return { clearCacheKey, verifyCacheInApi, verifyCacheInController };
};
