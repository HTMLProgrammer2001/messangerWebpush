import {SQS} from 'aws-sdk';

import {IMQ} from '../../interfaces/IMQ';
import {IEvent} from '../../interfaces/IEvent';
import {IObserver} from '../../interfaces/IObserver';


class SQSMesQueueService implements IMQ {
	private observers: IObserver[] = [];
	private sqs: SQS;
	private queueURL: string = null;

	async connect() {
		this.sqs = new SQS({
			accessKeyId: process.env.AWS_ACCESS_KEY,
			secretAccessKey: process.env.AWS_SECRET_KEY,
			region: process.env.AWS_REGION,
			apiVersion: '2012-11-05'
		});

		const queueResult = await this.sqs.getQueueUrl({
			QueueName: process.env.QUEUE_NAME,
			QueueOwnerAWSAccountId: process.env.ACCOUNT_ID
		}).promise();

		this.queueURL = queueResult.QueueUrl;
		this.startReceive();
	}

	private async startReceive(){
		while (true){
			const messagesResponse = await this.sqs.receiveMessage({
				MaxNumberOfMessages: 5,
				QueueUrl: this.queueURL
			}).promise();

			if(!messagesResponse.Messages?.length)
				continue;

			await Promise.all(messagesResponse.Messages.map(async msg => {
				const attrs: Record<string, any> = msg.MessageAttributes || {};
				console.log(msg.Attributes);
				console.log(msg.MessageAttributes);
				//send notification
				await this.notify({
					to: attrs['To'],
					data: msg.Body,
					type: attrs['Type']
				});

				//delete this message
				return this.sqs.deleteMessage({
					QueueUrl: this.queueURL,
					ReceiptHandle: msg.ReceiptHandle
				}).promise();
			}));
		}
	}

	addObserver(observer: IObserver) {
		this.observers.push(observer);
	}

	deleteObserver(observer: IObserver): void {
		this.observers = this.observers.filter(obs => obs != observer);
	}

	async notify(event: IEvent): Promise<any> {
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
