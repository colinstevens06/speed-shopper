import NodeCache from 'node-cache';
import { Express, Request, Response } from 'express';

export const useNodeCache = (app: Express, cache: NodeCache) => {
	const baseUrl = '/api/cache-clear';

	const clearAllCache = () => {
		return app.get(`${baseUrl}`, async (req: Request, res: Response) => {
			const allKeys = cache.keys();
			const deleteKeys = cache.del(allKeys);
			if (deleteKeys === allKeys.length) {
				res.send('All cache keys were deleted. Cache successfully reset.');
				console.log('\n*** Cache keys cleared');
			} else {
				res.send(
					'Error deleting all cache keys. Please try again later and contact administrator if failure persists.'
				);
			}
		});
	};

	clearAllCache();
};
