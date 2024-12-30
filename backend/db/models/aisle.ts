import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '.';

export class Aisle extends Model<InferAttributes<Aisle>, InferCreationAttributes<Aisle>> {
	declare aisleId: CreationOptional<number>;
	declare aisleOrder: number;
	declare groceryStoreId: CreationOptional<number>;
	declare name: string;
	declare updateby: string;
}

Aisle.init(
	{
		aisleId: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			field: 'aisleid'
		},
		aisleOrder: { type: DataTypes.INTEGER, allowNull: false, field: 'aisleorder' },
		groceryStoreId: {
			type: DataTypes.INTEGER,
			field: 'grocerystoreid',
			allowNull: false
		},
		name: {
			type: DataTypes.STRING
		},
		updateby: {
			type: DataTypes.STRING,
			defaultValue: 'admin' // TODO: NEED THIS TO GET INFO FROM AUTH
		}
	},
	{ sequelize }
);

// CREATE TABLE Aisle (
//   aisleId SERIAL PRIMARY KEY,
//   "name" VARCHAR(100) NOT NULL,
//   updatedAt TIMESTAMP NOT NULL,
//   updateBy VARCHAR(100) NOT NULL
// );
