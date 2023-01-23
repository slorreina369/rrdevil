const router = require("express").Router();
const { Approved } = require("../../models");

//GET ALL
router.get("/", (req, res) => {
  Approved.findAll()
    .then((dbApprovedData) => res.json(dbApprovedData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
//GET ONE
router.get("/:id", (req, res) => {
  Approved.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((dbApprovedData) => {
      if (!dbApprovedData) {
        res.status(404).json({ message: "No article was found with this id" });
        return;
      }
      res.json(dbApprovedData);
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
    .then((dbApprovedData) => res.json(dbApprovedData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
//PUT
router.put("/:id", (req, res) => {
  Approved.update(req.body, {
    where: {
      id: req.params.id,
    },
  }).then((dbApprovedData) => {
    if (!dbApprovedData) {
      res.status(404).json({ message: "No article was found with this id" });
      return;
    }
  });
});
//DELETE
router.delete("/:id", (req, res) => {
  Approved.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbApprovedData) => {
      if (!dbApprovedData) {
        res.status(404).json({ message: "No article was found with this id" });
        return;
      }
      res.json(dbApprovedData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
