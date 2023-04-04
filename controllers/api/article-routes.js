const router = require("express").Router();
const { Article, Policy } = require("../../models");
const authenticate = require("../../utils/auth");

//GET ALL
router.get("/", (req, res) => {
  Article.findAll({
    attributes: ["id", "title", "author", "article_url", "summary"],
    include: [
      {
        model: Policy,
        attributes: ["name"],
      },
    ],
  })
    .then((dbArticleData) => res.json(dbArticleData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
//GET ONE
router.get("/:id", (req, res) => {
  Article.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "author", "article_url", "summary"],
    include: [
      {
        model: Policy,
        attributes: ["name"],
      },
    ],
  })
    .then((dbArticleData) => {
      if (!dbArticleData) {
        res.status(404).json({ message: "No article was found with this id" });
        return;
      }
      res.json(dbArticleData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
//POST
router.post("/", (req, res) => {
  Article.create({
    title: req.body.title,
    author: req.body.author,
    article_url: req.body.article_url,
    policy_id: req.body.policy_id,
    summary: req.body.summary,
  })
    .then((dbArticleData) => res.json(dbArticleData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
//PUT
router.put("/:id", authenticate, (req, res) => {
  Article.update(req.body, {
    where: {
      id: req.params.id,
    },
  }).then((dbArticleData) => {
    if (!dbArticleData) {
      res.status(404).json({ message: "No article was found with this id" });
      return;
    }
  });
});
//DELETE
router.delete("/:id", authenticate, (req, res) => {
  Article.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbArticleData) => {
      if (!dbArticleData) {
        res.status(404).json({ message: "No article was found with this id" });
        return;
      }
      res.json(dbArticleData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
