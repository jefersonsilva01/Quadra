require("dotenv/config");

const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const subscribeTemplate = require("../templates/subscribe");
const Subscribe = require("../models/Subscribe.model");

router.get("/", (req, res) => {
  res.render("index");
});

router.post("/subscribe", (req, res) => {
  const { subscribe } = req.body;

  if (subscribe === "") {
    res.status(400).render("index", {
      subscribe: "E-mail field are required.",
      visibility: "visible"
    });
    return;
  }

  Subscribe.create({ email: subscribe })
    .then(subscribe => {
      let transporter = nodemailer.createTransport({
        service: 'Gmail',
        host: 'smtp.gmail.com',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        }
      });

      const message = "https://quadra-steel.vercel.app/auth/login"
      // const message = "http://localhost:3000/auth/login"

      transporter.sendMail({
        from: '"Quadra " <quadra@project.com>',
        to: subscribe.email,
        subject: 'Subscribe',
        text: message,
        html: subscribeTemplate.template(message)
      })
        .then(info => {
          res.render("index", {
            subscribe: "You subscribe successeful",
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
          subscribe: "E-mail need to be unique. Provide a valid email.",
          visibility: "visible"
        });
      } else {
        console.log(error);
      }
    });
});

module.exports = router;