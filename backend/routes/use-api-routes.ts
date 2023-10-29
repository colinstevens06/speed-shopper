import {
	useAddressApi,
	useAisleApi,
	useGroceryItemApi,
	useGroceryItemCategoryApi,
	useGroceryStoreApi,
	useGroceryStoreNameApi,
	useNodeCache,
	useShoppingListApi,
	useUserApi
} from './api';
import { Express } from 'express';
import NodeCache from 'node-cache';

export const useApiRoutes = (app: Express, cache: NodeCache) => {
	useAddressApi(app, cache);
	useAisleApi(app, cache);
	useNodeCache(app, cache);
	useGroceryItemApi(app, cache);
	useGroceryItemCategoryApi(app, cache);
	useGroceryStoreNameApi(app, cache);
	useGroceryStoreApi(app, cache);
	useShoppingListApi(app, cache);
	useUserApi(app, cache);
};
