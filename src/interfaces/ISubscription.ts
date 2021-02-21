import {PushSubscription} from 'web-push';


export interface ISubscription {
	user: string,
	subs: PushSubscription[]
}
