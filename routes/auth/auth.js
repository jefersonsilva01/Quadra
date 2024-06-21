require("dotenv").config();

const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const User = require("../../models/User.model");
const uploadCloud = require("../../config/cloudinary");
const templates = require("../../templates/signup");
const isLoggedOut = require("../../middlewares/isLoggedOut");

const bcrypt = require("bcrypt");

const saltRounds = 10;

router.get("/login", isLoggedOut, (req, res) => {
  res.render("auth/login");
});

router.get("/signup", isLoggedOut, (req, res) => {
  res.render("auth/signup");
});

router.post("/signup", uploadCloud.single("picture"), isLoggedOut, (req, res) => {
  const { username, email, password } = req.body;

  let imgPath, imgName

  if (req.file) {
    imgPath = req.file.url;
    imgName = req.file.originalname;
  } else {
    imgPath = "../../public/images/avatar.jpg";
    imgName = 'Avatar';
  }

  const characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  let token = "";

  for (let i = 0; i < 25; i++) {
    token += characters[Math.floor(Math.random() * characters.length)];
  }

  if (username === "" || email === "" || password === "") {
    res.status(400).render("auth/signup", {
      errorMessage: "All fields are mandatory. Please provide your username, email and password.",
      username,
      email,
      password
    });
    return;
  }

  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

  if (!regex.test(password)) {
    res.status(500).render("auth/signup", {
      errorMessage: "Password needs to have at least 8 chars and must contain at least one number, one lowercase and one uppercase letter."
    });
    return;
  }

  if (imgPath === undefined) {
    imgPath = "../../public/images/avatar.jpg";
    imgName = 'Avatar';
  }

  bcrypt
    .genSalt(saltRounds)
    .then(salt => bcrypt.hash(password, salt))
    .then(hashPassword => {
      return User.create(
        {
          username,
          email,
          password: hashPassword,
          status: 'Pending Confirmation',
          imgPath,
          imgName,
          confirmationCode: token
        }
      )
    })
    .then(user => {
      let transporter = nodemailer.createTransport({
        service: 'Gmail',
        host: 'smtp.gmail.com',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        }
      });

      // const message = `https://quadra-68d1b71920b6.herokuapp.com/auth/confirm/${token}`
      const message = `http://localhost:3000/auth/confirm/${token}`;

      transporter.sendMail({
        from: '"Quadra " <quadra@project.com>',
        to: email,
        subject: "Signup",
        text: message,
        html: templates.template(message)
      })
        .then(info => {
          res.render("index", {
            subscribe: "You signup successeful, check your e-mail to confirm",
            visibility: "visible"
          });
        })
        .catch(error => console.log(error));
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(500).render("index", { subscribe: error.message });
      } else if (error.code = 11000) {
        res.status(500).render("index", {
          subscribe: error.message,
          visibility: "visible"
        });
      } else {
        console.log(error);
      }
    });
});

router.get("/recover", (req, res) => {
  res.render("auth/recover");
});

module.exports = router;