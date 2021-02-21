import {IObserver} from '../interfaces/IObserver';
import {IEvent} from '../interfaces/IEvent';


const logObserver: IObserver = async (event: IEvent, next) => {
	console.log(event);
	return next();
};

export default logObserver;
