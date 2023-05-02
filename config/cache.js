const redis = require('redis');

let redisCache = redis.createClient();
(async () => {
    redisCache.on('error', (error) => console.error(`Error: ${error}`));

    await redisCache.connect();
})();

module.exports = { redisCache };
