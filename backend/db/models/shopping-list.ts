import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '.';

export class ShoppingList extends Model<InferAttributes<ShoppingList>, InferCreationAttributes<ShoppingList>> {
	declare shoppingListId: CreationOptional<number>;
	declare name: string;
	declare updateby: string;
	declare userId: number;
}

ShoppingList.init(
	{
		shoppingListId: {
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
		},
		userId: {
			type: DataTypes.NUMBER,
			field: 'userid'
		}
	},
	{ sequelize }
);

