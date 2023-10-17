import { User } from '@db/models/user';
import NodeCache from 'node-cache';
import { Error as SequelizeError } from 'sequelize';

export const useUserController = (cache: NodeCache) => {
	const createNewUser = async (
		clerkUserId: string,
		firstName: string,
		lastName: string,
		email: string,
		isAdmin: boolean = false
	) => {
		let newUser;

		try {
			newUser = await User.create({
				clerkUserId,
				firstName,
				lastName,
				email,
				isAdmin
			});
		} catch (error: any) {
			if (error instanceof SequelizeError) {
				console.error(error.message);
				throw new Error(error.message); // TODO: more error handling like this maybe
			}
		}

		return newUser;
	};

	const findUserByClerkId = async (clerkUserId: string) => {
		// Check if user is in the table
		let user;

		try {
			user = await User.findOne({ where: { clerkUserId } });
		} catch (error: any) {
			if (error instanceof SequelizeError) {
				console.error(error.message);
				throw new Error(error.message); // TODO: more error handling like this maybe
			}
		}

		return user;
	};

	return { createNewUser, findUserByClerkId };
};
