const redis = require('redis');

let redisCache = redis.createClient({
    "url": process.env.REDIS_URL
});
(async () => {
    redisCache.on('error', (error) => console.error(`Error: ${error}`));

    await redisCache.connect();
})();

module.exports = { redisCache };
