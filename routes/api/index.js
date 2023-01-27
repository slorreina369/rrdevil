const router = require("express").Router();
const queueRoutes = require("./queue-routes");
const articleRoutes = require("./article-routes");
const policyRoutes = require("./policy-routes");

router.use("/queue", queueRoutes);
router.use("/articles", articleRoutes);
router.use("/policies", policyRoutes);

module.exports = router;
