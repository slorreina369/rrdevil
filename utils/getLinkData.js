const { getLinkPreview } = require("link-preview-js");
const { redisCache } = require("../config/cache");

/**
 *Fetches Open Data information for link preview purposes
 * @param article
 * @returns Promise
 */
async function getLinkData(article) {
  let results = { url: article.article_url };
  try {
    const cacheResults = await redisCache.get(article.article_url);
    if (cacheResults) {
      results = JSON.parse(cacheResults);
    } else {
      results = await getLinkPreview(article.article_url);

      redisCache.set(article.article_url, JSON.stringify(results));
    }
  } catch (error) {
    console.error(`Error: ${error}`);
  }

  //Fall back to user submitted data if link preview data isn't present
  if (!results.title) {
    results.title = article.title;
  }
  if (!results.description) {
    results.description = article.description;
  }
  if (results.images === undefined || results.images.length === 0) {
    results.images = "/assets/rr_devildefault.jpg";
  }

  return results;
}

module.exports = { getLinkData };
