import type { UserPreferences } from './user-preferences';

export interface User {
	clerkUserId: string;
	isAdmin: boolean;
	email: string;
	firstName: string;
	lastName: string;
	fullName: string;
	preferences: UserPreferences;
}

export const initUserFromClerk = (id: string, email: string, firstName: string, lastName: string): User => {
	const user = {} as User;

	user.clerkUserId = id;
	user.isAdmin = false;
	user.email = email ?? '';
	user.firstName = firstName ?? '';
	user.lastName = lastName ?? '';
	user.fullName = `${firstName} ${lastName}`;

	return user;
};
