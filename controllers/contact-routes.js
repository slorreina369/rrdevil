const router = require("express").Router();
const { sendContactEmail } = require("./emails/send");

router.get("/", (req, res) => {
  res.render("contact");
});

router.post("/", (req, res) => {
  sendContactEmail(req.body.name, req.body.email, req.body.message);
  res.render("acknowledge");
});

module.exports = router;
