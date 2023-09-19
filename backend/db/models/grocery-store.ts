import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '.';

export class GroceryStore extends Model<InferAttributes<GroceryStore>, InferCreationAttributes<GroceryStore>> {
	declare groceryStoreId: CreationOptional<number>;
	declare addressId: number;
	declare groceryStoreNameId: number;
	declare updateby: string;
}

GroceryStore.init(
	{
		groceryStoreId: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			field: 'grocerystoreid'
		},
		addressId: {
			type: DataTypes.INTEGER,
			field: 'addressid'
		},
		groceryStoreNameId: {
			type: DataTypes.INTEGER,
			field: 'grocerystorenameid'
		},
		updateby: {
			type: DataTypes.STRING,
			defaultValue: 'admin' // TODO: NEED THIS TO GET INFO FROM AUTH
		}
	},
	{ sequelize }
);

// CREATE TABLE GroceryStore (
//   groceryStoreId SERIAL PRIMARY KEY,
//   addressId INT NOT NULL REFERENCES addresses(addressId),
//   groceryStoreNameId INT NOT NULL REFERENCES groceryStoreNames(groceryStoreNameId),
//   updatedAt TIMESTAMP NOT NULL,
//   updateBy VARCHAR(100) NOT NULL
// );
