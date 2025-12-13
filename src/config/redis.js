const { createClient } = require('redis');

const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
        host: 'redis-18789.c14.us-east-1-2.ec2.cloud.redislabs.com',
        port: 18789
    }
});

redisClient.on('error', err => console.log('Redis Client Error', err));

module.exports = redisClient;

