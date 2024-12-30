import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from 'sequelize';
import { sequelize } from '.';

export class AislesGroceryItemCategories extends Model<
	InferAttributes<AislesGroceryItemCategories>,
	InferCreationAttributes<AislesGroceryItemCategories>
> {
	declare aisleId: CreationOptional<number>;
	declare groceryItemCategoryId: CreationOptional<number>;
	declare updateby: string;
}

AislesGroceryItemCategories.init(
	{
		aisleId: {
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
	{ sequelize, tableName: 'aisles_groceryitemcategories' }
);
