import { Address } from '@db/models/address';
import { Aisle } from '@db/models/aisle';
import { AisleDto } from './aisle-dto';

export interface GroceryStoreDto {
	groceryStoreId: number;
	address: Address;
	groceryStoreName: string;
	aisles: AisleDto[];
}

export const initGroceryStoreDto = (groceryStore?: GroceryStoreDto): GroceryStoreDto => {
	groceryStore ??= {} as GroceryStoreDto;

	groceryStore.groceryStoreId ??= -1;
	groceryStore.address ??= new Address();
	groceryStore.groceryStoreName ??= '';
	groceryStore.aisles ??= [];

	return groceryStore;
};
