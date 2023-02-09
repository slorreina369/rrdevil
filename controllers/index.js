const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoutes = require("./home-routes");
const contactRoutes = require("./contact-routes");
const queueRoutes = require("./queuePage-routes");

router.use("/api", apiRoutes);

router.use("/", homeRoutes);
router.use("/contact", contactRoutes);
router.use("/queue", queueRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
