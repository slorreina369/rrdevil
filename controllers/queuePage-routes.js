const router = require("express").Router();
const { Queue } = require("../models");
const { getLinkPreview } = require("link-preview-js");

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

      return Promise.all(
        queues.map((queue) =>
          getLinkPreview(queue.article_url).then((data) => ({
            ...queue,
            preview: data,
          }))
        )
      );
    })
    .then((queues) => {
      res.render("queue", { queues });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
