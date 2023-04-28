const { getLinkPreview } = require("link-preview-js");
const { redisCache } = require("../config/cache");

/**
 *fetches Open Data information for link preview purposes
 * @param {string} article_url
 * @returns Promise
 */
async function getLinkData(article_url) {
  let results;
  try {
    const cacheResults = await redisCache.get(article_url);
    if (cacheResults) {
      results = JSON.parse(cacheResults);
    } else {
      results = await getLinkPreview(article_url);
      redisCache.set(article_url, JSON.stringify(results));
    }
    return results;
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

module.exports = { getLinkData };
