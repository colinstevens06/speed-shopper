import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '.';

export class GroceryItemCategory extends Model<
	InferAttributes<GroceryItemCategory>,
	InferCreationAttributes<GroceryItemCategory>
> {
	declare groceryItemCategoryId: CreationOptional<number>;
	declare name: string;
	declare updateby: string;
}

GroceryItemCategory.init(
	{
		groceryItemCategoryId: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			field: 'groceryitemcategoryid'
		},
		name: {
			type: DataTypes.STRING,
			unique: true
		},
		updateby: {
			type: DataTypes.STRING,
			defaultValue: 'admin', // TODO: NEED THIS TO GET INFO FROM AUTH
			field: 'updateby'
		}
	},
	{ sequelize }
);
