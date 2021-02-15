import {IEvent} from './IEvent';


export type IObserver = (event: IEvent<any>, next: () => Promise<void>) => Promise<void>
