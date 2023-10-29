import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from 'sequelize';
import { sequelize } from '.';

export class GroceryItemGroceryItemCategories extends Model<
	InferAttributes<GroceryItemGroceryItemCategories>,
	InferCreationAttributes<GroceryItemGroceryItemCategories>
> {
	declare groceryItemCategoryId: CreationOptional<number>;
	declare groceryItemId: CreationOptional<number>;
	declare updateby?: string;
}

GroceryItemGroceryItemCategories.init(
	{
		groceryItemId: {
			type: DataTypes.INTEGER,
			primaryKey: true
		},
		groceryItemCategoryId: {
			type: DataTypes.INTEGER,
			primaryKey: true
		},
		updateby: {
			type: DataTypes.STRING,
			defaultValue: 'admin' // TODO: NEED THIS TO GET INFO FROM AUTH
		}
	},
	{ sequelize, tableName: 'groceryitem_groceryitemcategories' }
);
