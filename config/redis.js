const redis = require('redis');
const client = redis.createClient(process.env.REDIS_URL)

client.on('connect',() => console.log("Redis Connected"));
client.on('error',(err) => console.error("Redis Error:",err));

module.exports = client;