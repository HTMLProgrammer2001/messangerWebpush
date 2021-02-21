import {Collection} from 'mongodb';
import {PushSubscription} from 'web-push';

import {getConnection} from '../initDB';


class SubscriptionRepository {
	private collection: Collection = null;

	constructor(){
		this.connect();
	}

	async connect(){
		const db = await getConnection(process.env.MONGO_URL);
		this.collection = db.db('messanger').collection('subscriptions');
	}

	async getSubscriptionsFor(userID: string): Promise<PushSubscription[]>{
		return [];
		this.collection.find({user: userID});
	}
}

export default new SubscriptionRepository();
