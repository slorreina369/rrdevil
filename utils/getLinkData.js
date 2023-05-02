const { getLinkPreview } = require("link-preview-js");
const { redisCache } = require("../config/cache");

/**
 *fetches Open Data information for link preview purposes
 * @param article
 * @returns Promise
 */
async function getLinkData(article) {
  let results;
  try {
    const cacheResults = await redisCache.get(article.article_url);
    if (cacheResults) {
      results = JSON.parse(cacheResults);
      console.log(results);
    } else {
      results = await getLinkPreview(article.article_url);
      console.log(results.images);
      if (results.images.length === 0) {
        results.images = "/assets/rr_devildefault.jpg";
        console.log("image replaced");
      } else {
        console.log("purely for debug purposes");
      }
      redisCache.set(article.article_url, JSON.stringify(results));
    }
    return results;
  } catch (error) {
    console.error(`Error: ${error}`);
    return {
      url: article.article_url,
      title: article.title,
      description: article.description,
    };
  }
}

module.exports = { getLinkData };
