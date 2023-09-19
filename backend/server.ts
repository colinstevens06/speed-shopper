import express from 'express';
import { useApiRoutes } from './routes/use-api-routes';
import cors from 'cors';
import NodeCache from 'node-cache';
import { useVerifyCache } from '@cache/init-verify-cache';

const cache = new NodeCache({ stdTTL: 900 }); // 15 minutes
const dev = process.env.NODE_ENV === 'development'; // TODO: figure this out
console.log(dev);

// import 'dotenv/config';
// import { config as configDotenv } from 'dotenv';
// import { resolve } from 'path';

const app = express();

// app.use(cors({ origin: 'http://127.0.0.1:5173' }));
app.use(cors());

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	next();
});

// configDotenv({ path: resolve(__dirname, './.env') });

// process.env.

const port = 3000;

// Hello world
app.get('/', (req, res) => {
	res.send('Hello World!');
});

useApiRoutes(app, cache);

// cache.initCache();

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});
