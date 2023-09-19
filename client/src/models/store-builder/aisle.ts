import type { GroceryItemCategory } from '..';
import type { GroceryItem } from './grocery-item';

export interface Aisle {
	aisleId?: number;
	groceryStoreId?: number;
	aisleOrder: number;
	name: string;
	items?: GroceryItem[];
	categories: GroceryItemCategory[];
}

export const initAisle = (aisle?: Aisle): Aisle => {
	aisle ??= {} as Aisle;

	aisle.aisleOrder = -1;
	aisle.name = '';
	aisle.categories = [];

	return aisle;
};
