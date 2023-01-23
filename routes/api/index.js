const router = require("express").Router();
const queueRoutes = require("./queue-routes");
const approvedRoutes = require("./approved-routes");
const policyRoutes = require("./policy-routes");

router.use("/queue", queueRoutes);
router.use("./approved", approvedRoutes);
router.use("./policies", policyRoutes);

module.exports = router;
