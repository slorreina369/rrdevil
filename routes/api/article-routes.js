const router = require("express").Router();
const { Article } = require("../../models");

//GET ALL
router.get("/", (req, res) => {
  Article.findAll()
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
  Queue.create({
    title: req.body.title,
    author: req.body.author,
    article_url: req.body.article_url,
  })
    .then((dbArticleData) => res.json(dbArticleData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
//PUT
router.put("/:id", (req, res) => {
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
router.delete("/:id", (req, res) => {
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
