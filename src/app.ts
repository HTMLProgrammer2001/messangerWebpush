import dotenv from 'dotenv';

import initDB from './initDB';
import mq from './services/mq';
import './observers/';


async function start() {
	dotenv.config();

	await initDB(process.env.MONGO_URL);
	await mq.connect();

	console.log('Push server started');
}

start();
