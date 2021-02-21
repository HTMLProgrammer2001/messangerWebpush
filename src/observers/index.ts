import mq from '../services/mq';

import logObserver from './LogObserver';
import newMessageObserver from './NewMessageObserver';

mq.addObserver(logObserver);
mq.addObserver(newMessageObserver);
