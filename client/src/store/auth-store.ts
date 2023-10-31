import { initAuthStoreState, type AuthStoreState } from '@models/store/auth-store-state';
import { Store } from './store';
import { initUserFromClerk, type User } from '@models/user';
import { authService } from '@services/auth-service';
import { clerk } from '@utils/clerk';
import type { UserResource } from '@clerk/types';
import { VueCookieNext } from 'vue-cookie-next';

class AuthStore extends Store<AuthStoreState> {
	constructor() {
		super(initAuthStoreState);
	}

	private jwtTokenKey = '__clerk_db_jwt';

	get clerkToken(): string {
		return VueCookieNext.getCookie(this.jwtTokenKey);
	}

	get isAdmin(): boolean {
		return this.state.isAdmin;
	}

	get isAuthenticated(): boolean {
		return this.state.isAuthenticated;
	}

	get user(): User | undefined {
		return this.state.user;
	}

	async createUser(): Promise<User | undefined> {
		const newUser = await authService.postNewUser();
		return newUser;
	}

	// Create account
	async setUser(user: User) {
		// hit API for USER Table
		const getUser = await authService.getUserByClerkId(user.clerkUserId);
		if (getUser) {
			this.state.user = getUser;
			this.state.isAdmin = getUser.isAdmin;
		} else {
			this.state.user = user;
			this.state.isAdmin = false; // New users are not admin
			this.createUser(); // Call after setting the user
		}
	}

	setIsAuthorized() {
		if (this.state.user) {
			this.state.isAuthenticated = true;
		} else {
			this.state.isAuthenticated = false;
		}
	}

	async loadUser(): Promise<void> {
		if (!this.state.user) {
			if (!clerk.loaded) {
				await clerk.load();
			}

			const clerkUser = (await clerk?.user) as UserResource | undefined | null;

			if (clerkUser) {
				// Set speed shopper user
				const user = initUserFromClerk(
					clerkUser.id,
					clerkUser.primaryEmailAddress?.emailAddress ?? '',
					clerkUser.firstName ?? '',
					clerkUser.lastName ?? ''
				);

				await this.setUser(user);
			}
		}
		this.setIsAuthorized();
	}
}

const authStore = new AuthStore();

export { authStore, AuthStore };
