import { useBaseApiV1 } from '@api/v1';
import { Express } from 'express';

export const useSafeRoutes = (app: Express) => {
	useBaseApiV1(app);
};
