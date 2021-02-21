import {getConnection} from './initDB';
import mq from './services/mq';

import './initEnv';
import './observers/';


async function start() {
	await getConnection(process.env.MONGO_URL);
	await mq.connect();

	console.log('Push server started');
}

start();
