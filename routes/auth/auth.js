const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.get("/signup", (req, res) => {
  res.render("auth/login");
});

module.exports = router;