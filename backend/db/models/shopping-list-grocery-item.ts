import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '.';

export class ShoppingListGroceryItem extends Model<
	InferAttributes<ShoppingListGroceryItem>,
	InferCreationAttributes<ShoppingListGroceryItem>
> {
	declare shoppingListId: number;
	declare groceryItemId: number;
	declare updateby?: string;
}

ShoppingListGroceryItem.init(
	{
		groceryItemId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			field: 'groceryitemid'
		},
		shoppingListId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			field: 'shoppinglistid'
		},
		updateby: {
			type: DataTypes.STRING,
			defaultValue: 'admin' // TODO: NEED THIS TO GET INFO FROM AUTH
		}
	},
	{ sequelize, tableName: 'shoppinglists_groceryitems' }
);

