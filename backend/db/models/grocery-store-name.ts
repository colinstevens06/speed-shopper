// const { DataTypes, Model } = require('sequelize');
// const { sequelize } = require('./iyarnndex');
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '.';

export class GroceryStoreName extends Model<
	InferAttributes<GroceryStoreName>,
	InferCreationAttributes<GroceryStoreName>
> {
	declare groceryStoreNameId: CreationOptional<number>;
	declare name: string;
	declare updateby: string;
}

GroceryStoreName.init(
	{
		groceryStoreNameId: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING,
			unique: true
		},
		updateby: {
			type: DataTypes.STRING,
			defaultValue: 'admin' // TODO: get info from auth
		}
	},
	{ sequelize }
);
