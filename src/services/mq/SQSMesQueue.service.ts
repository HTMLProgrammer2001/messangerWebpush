import {IMQ} from '../../interfaces/IMQ';
import {IEvent} from '../../interfaces/IEvent';
import {IObserver} from '../../interfaces/IObserver';


class SQSMesQueueService implements IMQ {
	private observers: IObserver[] = [];

	async connect() {

	}

	addObserver(observer: IObserver) {
		this.observers.push(observer);
	}

	deleteObserver(observer: IObserver): void {
		this.observers = this.observers.filter(obs => obs != observer);
	}

	async notify(event: IEvent<any>): Promise<any> {
		let i = 0,
			next = async () => {
				i++;

				if (this.observers[i - 1])
					await this.observers[i - 1](event, next);
			};

		return next();
	}
}

export default new SQSMesQueueService();
