require("dotenv/config");

const express = require("express"),
  router = express.Router(),
  User = require("../../models/User.model"),
  SocialLogin = require("../../models/SocialLogin.model"),
  Order = require("../../models/Order.model"),
  uploadCloud = require("../../config/cloudinary"),
  isLoggedIn = require("../../middlewares/isLoggedIn");

router.get("/orders", isLoggedIn, (req, res) => {
  res.render("private/orders");
});

router.get("/profile", isLoggedIn, (req, res) => {
  const id = req.session.currentUser._id;

  if ('facebookId' in req.session.currentUser || 'googleID' in req.session.currentUser) {

    SocialLogin.findOne({ _id: id })
      .then(user => {
        res.render("private/profile", {
          id: user.id,
          username: user.username,
          email: user.email || '',
          password: user.password || '',
          image: user.imgPath,
          alt: user.imgName
        });
      })
      .catch(err => console.log(err));
  } else {

    User.findOne({ _id: id })
      .then(user => {
        res.render("private/profile", {
          id: user.id,
          username: user.username,
          email: user.email,
          password: user.password,
          image: user.imgPath,
          alt: user.imgName
        });
      })
      .catch(err => console.log(err));
  }
});

router.post("/profile/:id", isLoggedIn, uploadCloud.single("picture"), (req, res) => {
  const { username, email, password, picture, alt } = req.body;
  const id = req.params.id;

  let imgPath, imgName

  if (req.file) {
    imgPath = req.file.url;
    imgName = req.file.originalname;
  } else {
    imgPath = picture;
    imgName = alt;
  }

  if ('facebookId' in req.session.currentUser || 'googleID' in req.session.currentUser) {
    SocialLogin.updateOne({ _id: id },
      {
        $set: {
          username,
          email,
          password,
          imgPath,
          imgName
        }
      })
      .then(() => res.redirect("/private/profile"))
      .catch(err => console.log(err));
  } else {
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
      .then(() => res.redirect("/private/profile"))
      .catch(err => console.log(err));
  }

});

router.get("/profile/:id/delete", isLoggedIn, (req, res) => {
  const id = req.params.id;

  if ('facebookId' in req.session.currentUser || 'googleID' in req.session.currentUser) {
    SocialLogin.findByIdAndDelete({ _id: id })
      .then(() => res.redirect("/auth/logout"))
      .catch(error => console.log(error));
  } else {
    User.findByIdAndDelete({ _id: id })
      .then(() => res.redirect("/auth/logout"))
      .catch(error => console.log(error));
  }

});

router.get("/new-order", isLoggedIn, (req, res) => {
  res.render("private/new-order");
});

module.exports = router;