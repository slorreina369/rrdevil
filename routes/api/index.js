const router = require("express").Router();
const queueRoutes = require("./queue-routes");

router.use("/queue", queueRoutes);

module.exports = router;
