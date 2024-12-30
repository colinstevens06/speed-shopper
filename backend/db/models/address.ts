import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from 'sequelize';
import { sequelize } from '.';

export class Address extends Model<InferAttributes<Address>, InferCreationAttributes<Address>> {
	declare addressId: CreationOptional<number>;
	declare addressLineOne: string;
	declare addressLineTwo: CreationOptional<string>;
	declare city: string;
	declare state: string;
	declare zip: number;
	declare updateby: string;
}

Address.init(
	{
		addressId: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			field: 'addressid'
		},
		addressLineOne: {
			type: DataTypes.STRING,
			unique: true,
			field: 'addresslineone'
		},
		addressLineTwo: {
			type: DataTypes.STRING,
			field: 'addresslinetwo'
		},
		city: {
			type: DataTypes.STRING,
			unique: true
		},
		state: {
			type: DataTypes.STRING,
			unique: true
		},
		zip: {
			type: DataTypes.INTEGER
		},
		updateby: {
			type: DataTypes.STRING,
			defaultValue: 'admin' // TODO: NEED THIS TO GET INFO FROM AUTH
		}
	},
	{ sequelize }
);

// CREATE TABLE Address (
//   addressId SERIAL PRIMARY KEY,
//   addressLineOne VARCHAR(100) NOT NULL,
//   addressLineTwo VARCHAR(100),
//   city VARCHAR(100) NOT NULL,
//   state VARCHAR(50) not NULL,
//   zip INT,
//   updatedAt TIMESTAMP NOT NULL,
//   updateBy VARCHAR(100) NOT NULL,
//   UNIQUE(addressLineOne, city, state)
// );
