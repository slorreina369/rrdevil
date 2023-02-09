const router = require("express").Router();
const { Queue } = require("../models");

router.get("/", (req, res) => {
  Queue.findAll({
    attributes: [
      "id",
      "title",
      "author",
      "article_url",
      "policy_cat",
      "summary",
      "email",
    ],
  })
    .then((dbQueueData) => {
      const queues = dbQueueData.map((queue) => queue.get({ plain: true }));

      res.render("queue", { queues });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
