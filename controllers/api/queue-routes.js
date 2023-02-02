const router = require("express").Router();
const { Queue } = require("../../models");

//GET All
router.get("/", (req, res) => {
  Queue.findAll()
    .then((dbQueueData) => res.json(dbQueueData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
//GET ONE
router.get("/:id", (req, res) => {
  Queue.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((dbQueueData) => {
      if (!dbQueueData) {
        res
          .status(404)
          .json({ message: "No submission was found with this id" });
        return;
      }
      res.json(dbQueueData);
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
    policy_cat: req.body.policy_cat,
    summary: req.body.summary,
    email: req.body.email,
  })
    .then((dbQueueData) => res.json(dbQueueData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
//PUT
router.put("/:id", (req, res) => {
  Queue.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((dbQueueData) => {
      if (!dbQueueData[0]) {
        res
          .status(404)
          .json({ message: "No submission was found with this id" });
        return;
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
//DELETE
router.delete("/:id", (req, res) => {
  Queue.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbQueueData) => {
      if (!dbQueueData) {
        res
          .status(404)
          .json({ message: "No submission was found with this id" });
        return;
      }
      res.json(dbQueueData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;