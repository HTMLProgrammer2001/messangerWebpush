import {connect, MongoClient} from 'mongodb';


let client: MongoClient = null;

export const getConnection = async (url?: string) => {
	if(client)
		return client;

	if(!url)
		throw new Error('No URL for db connection');

	try{
		client = await new Promise((resolve, reject) => {
			connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true},
				(err, connect) => err ? reject(err) : resolve(connect));
		});

		return client;
	}
	catch (e) {
		throw new Error(e);
	}
};
