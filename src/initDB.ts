import {connect} from 'mongodb';


const connectDB = async (url: string) => {
	if(!url)
		throw new Error('No URL for db connection');

	return connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});
};

export default connectDB;
