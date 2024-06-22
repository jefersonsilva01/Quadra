require("dotenv").config();

const express = require("express");
const router = express.Router();
const ensureLogin = require('connect-ensure-login');
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const User = require("../../models/User.model");
const uploadCloud = require("../../config/cloudinary");
const isLoggedIn = require("../../middlewares/isLoggedIn");


router.get("/orders", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("logged/orders");
})

module.exports = router;