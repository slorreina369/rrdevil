const router = require("express").Router();
const { Policy } = require("../models");

router.get("/", (req, res) => {
  Policy.findAll({
    attributes: ["name"],
  })
    .then((dbPolicyData) => {
      const policies = dbPolicyData.map((policy) =>
        policy.get({ plain: true })
      );

      res.render("homepage", { policies });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
