import {IEvent} from './IEvent';


export type IObserver = (event: IEvent, next: () => Promise<void>) => Promise<void>
