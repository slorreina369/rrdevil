const router = require("express").Router();
const { Article } = require("../models");
const { getLinkData } = require("../utils/getLinkData");
const shuffle = require("../utils/shuffle");

router.get("/", (req, res) => {
  Article.findAll({
    attributes: ["id", "title", "author", "article_url"],
  })
    .then((dbArticleData) => {
      const articles = dbArticleData.map((article) =>
        article.get({ plain: true })
      );

      //pulling article metadata to be displayed on the homepage
      return Promise.all(
        articles.map((article) =>
          getLinkData(article).then((data) => ({
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
