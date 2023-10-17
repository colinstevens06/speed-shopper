import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from 'sequelize';
import { sequelize } from '.';

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
	declare userId: CreationOptional<number>;
	declare clerkUserId: string;
	declare updateby?: string;
	declare firstName: string;
	declare lastName: string;
	declare isAdmin?: boolean;
	declare email: string;
}

User.init(
	{
		userId: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			field: 'userid'
		},
		clerkUserId: {
			type: DataTypes.STRING,
			unique: true,
			field: 'clerkuserid'
		},
		firstName: {
			type: DataTypes.STRING,
			field: 'firstname'
		},
		lastName: {
			type: DataTypes.STRING,
			field: 'lastname'
		},
		email: {
			type: DataTypes.STRING
		},
		isAdmin: {
			type: DataTypes.BOOLEAN,
			defaultValue: false, // TODO: get info from auth,
			field: 'isadmin'
		},
		updateby: {
			type: DataTypes.STRING,
			defaultValue: 'admin', // TODO: get info from auth
			field: 'updateby'
		}
	},
	{ sequelize }
);
