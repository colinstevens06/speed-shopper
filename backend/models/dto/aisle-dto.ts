import { useVerifyCache } from '@cache/init-verify-cache';
import { Aisle } from '@db/models/aisle';
import { GroceryItemCategory } from '@db/models/grocery-item-category';
import { CacheKeys } from '@models/cache';
import NodeCache from 'node-cache';

export interface AisleDto {
	aisleId: number;
	aisleOrder: number;
	categories: GroceryItemCategory[];
	groceryStoreId: number;
	name: string;
	updateby: string;
}

export const buildAisleDtoFromAisle = (aisle: Aisle): AisleDto => {
	const aisleDto = {} as AisleDto;

	aisleDto.aisleId = aisle.aisleId;
	aisleDto.aisleOrder = aisle.aisleOrder;
	aisleDto.categories = [];
	aisleDto.groceryStoreId = aisle.groceryStoreId;
	aisleDto.name = aisle.name;
	aisleDto.updateby = aisle.updateby;

	return aisleDto;
};
