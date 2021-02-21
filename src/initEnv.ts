import {config} from 'dotenv';


const env = process.env.APP_ENV;
config({path: `.env${env ? '.' + env : ''}`});
