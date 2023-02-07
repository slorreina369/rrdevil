const router = require("express").Router();
const { Queue } = require("../models");
const sequelize = require("../config/connection");

router.get("/", (req, res) => {
  res.render("contact");
});

module.exports = router;
