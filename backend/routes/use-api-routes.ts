import {
  useAddressApi,
  useAisleApi,
  useGroceryItemApi,
  useGroceryItemCategoryApi,
  useGroceryStoreApi,
  useGroceryStoreNameApi,
} from "./api";
import { Express } from "express";

export const useApiRoutes = (app: Express) => {
  useAddressApi(app);
  useAisleApi(app);
  useGroceryItemApi(app);
  useGroceryItemCategoryApi(app);
  useGroceryStoreNameApi(app);
  useGroceryStoreApi(app);
};
