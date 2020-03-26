import * as dotenv from 'dotenv/config';
const config = {
    port: process.env.PORT || 8081,
    mode: process.env.NODE_ENV || 'development',
    dbConnection: process.env.DB_CONNECTION_STRING || '',
    secretHashKey: 'iloveindia'
};

export default config;