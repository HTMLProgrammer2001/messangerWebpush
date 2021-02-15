import {IObserver} from './IObserver';
import {IEvent} from './IEvent';


export interface IMQ {
	connect(): Promise<void>,
	addObserver(observer: IObserver): void,
	deleteObserver(observer: IObserver): void,
	notify(event: IEvent<any>): Promise<any>
}
