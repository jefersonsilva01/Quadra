const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {
  res.render("auth/login");
});

module.exports = router;