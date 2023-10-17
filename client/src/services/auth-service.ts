import type { User } from '@models/user';
import ServiceBase from './service-base';
import { authStore } from '@store/auth-store';
import { ResultType, type PostResult } from '@models/dto';

class AuthService extends ServiceBase {
	async getUserByClerkId(id: string): Promise<User> {
		return await this.get<User>(`/user?clerkId=${id}`);
	}
	async postNewUser() {
		if (authStore.user) {
			const userDto = {
				clerkUserId: authStore.user.clerkUserId,
				firstName: authStore.user.firstName,
				lastName: authStore.user.lastName,
				email: authStore.user.email
			};
			let newUser;
			const postResult = await this.post<PostResult<User>>(`/user`, userDto);
			if (postResult.resultType === ResultType.Success) {
				newUser = postResult.value;
			}

			return newUser;
		} else {
			throw new Error('New user info');
		}
	}
}

const authService = new AuthService();

export { authService, AuthService };
