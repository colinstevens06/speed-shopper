import 'dotenv/config'; // Do this at top of file
import express from 'express';
import cors from 'cors';
import NodeCache from 'node-cache';
import { authenticateToken } from '@auth/authenticate-token';
import { useApiRoutes } from '@routes/use-api-routes'; // Use as last import because this initiates the DB
import { useSafeRoutes } from '@routes/use-safe-routes';

const cache = new NodeCache({ stdTTL: 900 }); // 15 minutes

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const app = express();
const port = parseInt(process.env.PORT ?? '3000'); // does this change per env in Prod // todo: heroku update?

app.use(cors());

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

app.use((_req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	next();
});
// Add routes which don't require routes
useSafeRoutes(app);
// Add auth and give a 403 if the user is forbidden on the API
app.use(authenticateToken);
// Routes below require auth
useApiRoutes(app, cache);

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});
