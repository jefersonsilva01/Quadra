require("dotenv/config");

const express = require("express"),
  router = express.Router(),
  User = require("../../models/User.model"),
  SocialLogin = require("../../models/SocialLogin.model"),
  Order = require("../../models/Order.model"),
  uploadCloud = require("../../config/cloudinary"),
  isLoggedIn = require("../../middlewares/isLoggedIn"),
  bcrypt = require("bcrypt"),
  saltRounds = 10;

router.get("/orders", isLoggedIn, (req, res) => {
  const id = req.session.currentUser._id;

  Order.find({ profileId: id })
    .then(orders => {
      if (orders.length > 0) {
        res.render("private/orders", { orders })
      } else {
        res.render("private/orders");
      };
    })
    .catch(err => console.log(err));
});

router.get("/orders/:id/delete", isLoggedIn, (req, res) => {
  const id = req.params.id;

  Order.findByIdAndDelete({ _id: id })
    .then(() => res.redirect("/private/orders"))
    .catch(err => console.log(err));
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
  const { username, email, picture, alt } = req.body,
    id = req.params.id;

  let imgPath, imgName, password;

  if (req.file) {
    imgPath = req.file.url;
    imgName = req.file.originalname;
  } else {
    imgPath = picture;
    imgName = alt;
  }

  bcrypt
    .genSalt(saltRounds)
    .then(salt => bcrypt.hash(req.body.password, salt))
    .then(hashPassword => {
      if ('facebookId' in req.session.currentUser || 'googleID' in req.session.currentUser) {
        SocialLogin.updateOne({ _id: id },
          {
            $set: {
              username,
              email,
              password: hashPassword,
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
              password: hashPassword,
              imgPath,
              imgName
            }
          })
          .then(() => res.redirect("/private/profile"))
          .catch(err => console.log(err));
      }
    });
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

router.post("/new-order", isLoggedIn, (req, res) => {
  const profileId = req.session.currentUser._id;
  const {
    color,
    addressCode,
    city,
    state,
    street,
    number,
    cardName,
    cardNumber,
    expirateDate,
    cvc
  } = req.body;

  let imgPath;

  if (color === 'DARK CHALKS') {
    imgPath = '../images/quadra-27.png'
  } else {
    imgPath = '../images/quadra-09.png'
  }

  Order.create({
    profileId,
    color,
    imgPath,
    addressCode,
    city,
    state,
    street,
    number,
    cardName,
    cardNumber,
    expirateDate,
    cvc
  });

  res.redirect("/private/ordered");
});

router.get("/update-order/:id", isLoggedIn, (req, res) => {
  const id = req.params.id;

  Order.findById({ _id: id })
    .then(order => {
      const obj = { ...order._doc }
      if (obj.color === "DARK CHALKS") {
        obj.darkChalks = true;
      } else {
        obj.arcticWhite = true;
      }
      res.render("private/new-order", obj)
    })
    .catch(err => console.log(err));
})

router.post("/update-order/:id", isLoggedIn, (req, res) => {
  const id = req.params.id;

  const {
    color,
    addressCode,
    city,
    state,
    street,
    number,
    cardName,
    cardNumber,
    expirateDate,
    cvc
  } = req.body;

  let imgPath;

  if (color === 'DARK CHALKS') {
    imgPath = '../images/quadra-27.png'
  } else {
    imgPath = '../images/quadra-09.png'
  }

  Order.updateOne({ _id: id },
    {
      $set: {
        color,
        imgPath,
        addressCode,
        city,
        state,
        street,
        number,
        cardName,
        cardNumber,
        expirateDate,
        cvc
      }
    })
    .then(order => res.redirect("/private/orders"))
    .catch(err => console.log(err));
});

router.get("/ordered", isLoggedIn, (req, res) => {
  res.render("private/ordered");
});

module.exports = router;