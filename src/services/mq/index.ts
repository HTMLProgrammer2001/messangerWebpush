import sqs from './SQSMesQueue.service';
import {IMQ} from '../../interfaces/IMQ';


let mq: IMQ = null;

switch (process.env.MQ_TYPE) {
	default:
		mq = sqs;
}

export default mq;
