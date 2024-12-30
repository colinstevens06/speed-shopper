import NodeCache from 'node-cache';
import { Express, Request, Response } from 'express';
import { useUserController } from '@controllers/index';
import { User } from '@db/models/user';
import { PostUserDto, ResultType, initPostResult } from '@models/dto';
const jwt = require('jsonwebtoken');

export const useUserApi = (app: Express, cache: NodeCache) => {
	const baseUrl = '/api/user';

	const { createNewUser, findUserByClerkId } = useUserController(cache);

	const getUserByClerkId = () => {
		return app.get(`${baseUrl}`, async (req: Request, res: Response) => {
			const clerkId = req.query.clerkId as string;
			let user;
			try {
				user = await findUserByClerkId(clerkId);
				jwt.sign(JSON.stringify(user), process.env.CLERK_SECRET_KEY);
			} catch (error) {
				console.error(error);
			}
			res.send(user);
		});
	};

	const postNewUser = () => {
		return app.post(`${baseUrl}`, async (req: Request, res: Response) => {
			const postResult = initPostResult();
			const userDto = req.body as PostUserDto;

			let newUser;

			try {
				newUser = await createNewUser(
					userDto.clerkUserId,
					userDto.firstName,
					userDto.lastName,
					userDto.email,
					userDto.isAdmin
				);
				if (newUser) {
					postResult.resultType = ResultType.Success;
					postResult.value = newUser;
				}
			} catch (error) {
				console.error();
			}
			res.send(newUser);
		});
	};

	getUserByClerkId();
	postNewUser();
};
