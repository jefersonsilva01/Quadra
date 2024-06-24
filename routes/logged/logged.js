require("dotenv").config();

const express = require("express");
const router = express.Router();
const User = require("../../models/User.model");
const SocialLogin = require("../../models/SocialLogin.model");
const Order = require("../../models/Order.model");
const uploadCloud = require("../../config/cloudinary");
const isLoggedIn = require("../../middlewares/isLoggedIn");


router.get("/orders", isLoggedIn, (req, res) => {
  res.render("logged/orders");
});

router.get("/profile", isLoggedIn, (req, res) => {
  const id = req.session.currentUser._id;

  if ('facebookId' in req.session.currentUser || 'googleID' in req.session.currentUser) {

    SocialLogin.findOne({ _id: id })
      .then(user => {
        res.render("logged/profile", {
          id: user.id,
          username: user.username,
          email: user.email || '',
          password: user.password || '',
          image: user.imgPath,
          alt: user.imgName
        });
      })
      .catch(err => console.log(err));
  }

  User.findOne({ _id: id })
    .then(user => {
      res.render("logged/profile", {
        id: user.id,
        username: user.username,
        email: user.email,
        password: user.password,
        image: user.imgPath,
        alt: user.imgName
      });
    })
    .catch(err => console.log(err));
});

router.post("/profile/:id", isLoggedIn, uploadCloud.single("picture"), (req, res) => {
  const { username, email, password, picture, alt } = req.body;
  const id = req.params.id;
  console.log(username, email, password, id, req.body);

  let imgPath, imgName

  if (req.file) {
    imgPath = req.file.url;
    imgName = req.file.originalname;
  } else {
    imgPath = picture;
    imgName = alt;
  }

  User.updateOne({ _id: id },
    {
      $set: {
        username,
        email,
        password,
        imgPath,
        imgName
      }
    })
    .then(() => res.redirect("/logged/profile"))
    .catch(err => console.log(err));
});

router.get("/profile/:id/delete", isLoggedIn, (req, res) => {
  const id = req.params.id;
  console.log(id);

  User.findByIdAndDelete({ _id: id })
    .then(() => res.redirect("/auth/logout"))
    .catch(error => console.log(error));
});

router.get("/new-order", isLoggedIn, (req, res) => {
  res.render("logged/new-order");
});

module.exports = router;