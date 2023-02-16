const router = require("express").Router();
const { Policy, Article } = require("../models");
const { getLinkPreview } = require("link-preview-js");

router.get("/:id", async (req, res) => {
  Policy.findOne({
    where: { id: req.params.id },
    attributes: ["id", "name"],
    include: {
      model: Article,
      attributes: [
        "id",
        "title",
        "author",
        "article_url",
        "policy_id",
        "summary",
      ],
    },
  })
    .then((dbPolicyData) => {
      if (!dbPolicyData) {
        res.status(400).json("Policy not found");
        return;
      }
      const policy = dbPolicyData.get({ plain: true });
      console.log(policy.articles);

      return Promise.all(
        policy.articles.map((article) =>
          getLinkPreview(article.article_url).then((data) => ({
            ...article,
            preview: data,
          }))
        )
      );
    })
    .then((articles) => {
      console.log(articles);
      res.render("policy", {
        articles,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
