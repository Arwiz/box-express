import * as dotenv from 'dotenv/config';

const config = {
    port: process.env.PORT || 8081,
    mode: process.env.NODE_ENV || 'development'
};

export default config;