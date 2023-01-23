const router = require("express").Router();
const queueRoutes = require("./queue-routes");
const approvedRoutes = require("./approved-routes");

router.use("/queue", queueRoutes);
router.use("./approved", approvedRoutes);

module.exports = router;
