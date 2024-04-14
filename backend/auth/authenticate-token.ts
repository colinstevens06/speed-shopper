import { Request, Response, NextFunction } from 'express';
// import clerkClient from '@clerk/clerk-sdk-node';
import { clients, sessions, users } from '@clerk/clerk-sdk-node';

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
	if (token == null) {
		res.sendStatus(403);
	} else {
		try {
			const client = await clients.verifyClient(token);

			if (!client) {
				res.sendStatus(403);
			} else {
				const sessionId = client.lastActiveSessionId;

				if (sessionId) {
					const session = await sessions.getSession(sessionId);

					const user = await users.getUser(session.userId);

					res.locals.clerkUserId = user.id;
				}
			}
		} catch (error) {
			console.error(error);
			res.sendStatus(403);
		}

		next();
	}
};
