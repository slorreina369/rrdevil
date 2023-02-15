const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoutes = require("./home-routes");
const contactRoutes = require("./contact-routes");
const queueRoutes = require("./queuePage-routes");
const { Policy } = require("../models");
const policyRoutes = require("./policy-routes");

router.use("/api", apiRoutes);

router.use(function (req, res, next) {
  Policy.findAll({
    attributes: ["id", "name"],
  })
    .then((dbPolicyData) => {
      const policies = dbPolicyData.map((policy) =>
        policy.get({ plain: true })
      );
      res.locals = {
        policies,
      };
      next();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
router.use("/", homeRoutes);
router.use("/contact", contactRoutes);
router.use("/queue", queueRoutes);
router.use("/policies", policyRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
