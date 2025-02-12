const redis = require('redis');
const client = redis.createClient({
    url: process.env.REDIS_URL,
    socket: {
        tls: true,
        rejectUnauthorized: false
    }
});

client.on('connect',() => console.log("Redis Connected"));
client.on('error',(err) => console.error("Redis Error:",err));

module.exports = client;