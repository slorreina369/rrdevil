const router = require("express").Router();
const { Policy, Article } = require("../../models");
const authenticate = require("../../utils/auth");

//GET ALL
router.get("/", (req, res) => {
  Policy.findAll({
    attributes: ["id", "name"],
    include: [
      {
        model: Article,
        attributes: ["title", "author", "article_url", "summary"],
      },
    ],
  })
    .then((dbPolicyData) => res.json(dbPolicyData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
//GET ONE
router.get("/:id", (req, res) => {
  router.get("/:id", (req, res) => {
    Policy.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "name"],
      include: [
        {
          model: Article,
          attributes: ["title", "author", "article_url", "summary"],
        },
      ],
    })
      .then((dbPolicyData) => {
        if (!dbPolicyData) {
          res.status(404).json({ message: "No Polcy was found with this id" });
          return;
        }
        res.json(dbPolicyData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
});
//POST
router.post("/", authenticate, (req, res) => {
  Policy.create({
    name: req.body.name,
  })
    .then((dbPolicyData) => res.json(dbPolicyData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
//PUT
router.put("/:id", authenticate, (req, res) => {
  Policy.update(req.body, {
    where: {
      id: req.params.id,
    },
  }).then((dbPolicyData) => {
    if (!dbPolicyData) {
      res.status(404).json({ message: "No policy was found with this id" });
      return;
    }
  });
});
//DELETE
router.delete("/:id", authenticate, (req, res) => {
  Policy.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbPolicyData) => {
      if (!dbPolicyData) {
        res.status(404).json({ message: "No policy was found with this id" });
        return;
      }
      res.json(dbPolicyData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
