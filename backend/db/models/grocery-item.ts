import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '.';

export class GroceryItem extends Model<InferAttributes<GroceryItem>, InferCreationAttributes<GroceryItem>> {
	declare groceryItemId: CreationOptional<number>;
	declare name: string;
	declare updateby: string;
	declare groceryItemCategoryId: CreationOptional<number>;
}

GroceryItem.init(
	{
		groceryItemId: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			field: 'groceryitemid'
		},
		groceryItemCategoryId: {
			type: DataTypes.INTEGER,
			field: 'groceryitemcategoryid'
		},
		name: {
			type: DataTypes.STRING,
			unique: true
		},
		updateby: {
			type: DataTypes.STRING,
			defaultValue: 'admin' // TODO: NEED THIS TO GET INFO FROM AUTH
		}
	},
	{ sequelize }
);
