import {sendNotification} from 'web-push';

import {IObserver} from '../interfaces/IObserver';
import {IEvent} from '../interfaces/IEvent';
import SubscriptionRepository from '../repositories/Subscription.repository';


const newMessageObserver: IObserver = async (event: IEvent, next) => {
	if(event.type != 'NEW_MESSAGE')
		return next();

	const subs = await SubscriptionRepository.getSubscriptionsFor(event.to);
	await Promise.all(subs.map(sub => sendNotification(sub, event.data)));
};

export default newMessageObserver;
