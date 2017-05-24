'use strict';

require('dotenv').config();

const config = {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    securityToken: process.env.SECURITY_TOKEN
};

export default config;
