const router = require("express").Router();
const { Article } = require("../models");
const { getLinkPreview } = require("link-preview-js");
const shuffle = require("../utils/randomizer");

router.get("/", (req, res) => {
  Article.findAll({
    attributes: ["id", "title", "author", "article_url"],
  })
    .then((dbArticleData) => {
      const articles = dbArticleData.map((article) =>
        article.get({ plain: true })
      );

      return Promise.all(
        articles.map((article) =>
          getLinkPreview(article.article_url).then((data) => ({
            ...article,
            preview: data,
          }))
        )
      );
    })
    .then((articles) => {
      shuffle(articles);
      res.render("homepage", { articles });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
