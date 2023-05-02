const router = require("express").Router();
const { Queue } = require("../models");
const { getLinkData } = require("../utils/getLinkData");

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

      //pulling article metadata to be displayed on the homepage
      return Promise.all(
        queues.map((queue) =>
          getLinkData(queue).then((data) => ({
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
