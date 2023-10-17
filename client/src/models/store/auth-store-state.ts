import type { User } from '@models/user';

export interface AuthStoreState {
	isAdmin: boolean;
	isAuthenticated: boolean;
	user?: User;
}

export const initAuthStoreState = (): AuthStoreState => {
	const state = {} as AuthStoreState;

	state.isAdmin = false;
	state.isAuthenticated = false;

	return state;
};