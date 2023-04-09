import type { GroceryItem } from './grocery-item';

export interface Aisle {
	aisleId: number;
	order: number;
	name: string;
	items: GroceryItem[];
}
