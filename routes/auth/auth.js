require("dotenv").config();

const express = require("express"),
  router = express.Router(),
  passport = require("passport"),
  nodemailer = require("nodemailer"),
  mongoose = require("mongoose"),
  User = require("../../models/User.model"),
  uploadCloud = require("../../config/cloudinary"),
  templateSignup = require("../../templates/signup"),
  templateRecover = require("../../templates/recover"),
  isLoggedOut = require("../../middlewares/isLoggedOut"),
  isLoggedIn = require("../../middlewares/isLoggedIn"),
  bcrypt = require("bcrypt"),
  saltRounds = 10;

router.get("/login", isLoggedOut, (req, res) => {
  res.render("auth/login");
});

router.get("/signup", isLoggedOut, (req, res) => {
  res.render("auth/signup");
});

router.post("/login", isLoggedOut, (req, res) => {
  const { email, password } = req.body;

  if (email === "" || password === "") {
    res.status(400).render("auth/login", {
      messageError: "All fields are mandatory. Please provide, email and password.",
    });
    return;
  }

  if (password.length < 8) {
    res.status(400).render("auth/login", {
      messageError: "Your password needs to be at least 8 characters long.",
      email,
      password
    });
    return;
  }

  User.findOne({ email })
    .then(user => {
      if (!user) {
        res.status(400).render("auth/login", {
          messageError: "Wrong credentials.",
          email,
          password
        });
        return;
      }

      bcrypt
        .compare(password, user.password)
        .then(isSamePassword => {
          if (!isSamePassword) {
            res.status(400).render("auth/login", {
              messageError: "Wrong credentials.",
              email,
              password
            });
            return;
          }
          req.session.currentUser = user.toObject();
          delete req.session.currentUser.password;
          res.redirect("/private/orders");
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

router.post("/signup", isLoggedOut, uploadCloud.single("picture"), (req, res) => {
  const { username, email, password } = req.body;

  let imgPath, imgName

  if (req.file) {
    imgPath = req.file.url;
    imgName = req.file.originalname;
  } else {
    imgPath = "../images/avatar.jpg";
    imgName = 'Avatar';
  }

  const characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  let token = "";

  for (let i = 0; i < 25; i++) {
    token += characters[Math.floor(Math.random() * characters.length)];
  }

  if (username === "" || email === "" || password === "") {
    res.status(400).render("auth/signup", {
      messageError: "All fields are mandatory. Please provide your username, email and password.",
      username,
      email,
      password
    });
    return;
  }

  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

  if (!regex.test(password)) {
    res.status(500).render("auth/signup", {
      messageError: "Password needs to have at least 8 chars and must contain at least one number, one lowercase and one uppercase letter.",
      username,
      email,
      password
    });
    return;
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

      const message = `https://quadra-steel.vercel.app/auth/confirm/${token}`
      // const message = `http://localhost:3000/auth/confirm/${token}`;

      transporter.sendMail({
        from: '"Quadra " <quadra@project.com>',
        to: email,
        subject: "Signup",
        text: message,
        html: templateSignup.template(message)
      })
        .then(info => {
          res.render("auth/signup", {
            messageSuccess: "You signup successeful, check your e-mail to confirm",
          });
        })
        .catch(error => console.log(error));
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(500).render("auth/signup", {
          messageError: error.message,
          username,
          email,
          password
        });
      } else if (error.code = 11000) {
        res.status(500).render("auth/signup", {
          messageError: error.message,
          username,
          email,
          password
        });
      } else {
        console.log(error);
      }
    });
});

router.get('/confirm/:confirmCode', isLoggedOut, (req, res, next) => {
  const code = req.params.confirmCode;

  User.find({ confirmationCode: code })
    .then(user => {
      if (user[0].confirmationCode === code) {
        User.updateOne({ _id: user[0]._id }, { status: 'Active' })
          .then(() => res.render('auth/login'))
          .catch(error => console.log(error));
      }
    })
    .catch(error => console.log(error));
});

router.get("/recover", isLoggedOut, (req, res) => {
  res.render("auth/recover");
});

router.post("/recover", isLoggedOut, (req, res) => {
  const { email } = req.body;

  if (email === "") {
    res.status(400).render("auth/recover", {
      messageError: "E-mail are required"
    });
    return;
  }

  User.findOne({ email })
    .then(user => {
      if (!user) {
        res.status(400).render("auth/recover", {
          messageError: "User not find",
          email
        });
        return;
      }

      let transporter = nodemailer.createTransport({
        service: 'Gmail',
        host: 'smtp.gmail.com',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        }
      });

      const message = `https://quadra-steel.vercel.app/password/${user._id}`
      // const message = `http://localhost:3000/auth/password/${user._id}`;

      transporter.sendMail({
        from: '"Quadra " <quadra@project.com>',
        to: email,
        subject: "Recover password",
        text: message,
        html: templateRecover.template(message)
      })
        .then(info => {
          res.render("auth/recover", {
            messageSuccess: "We send an e-mail to recover your password",
          });
        })
        .catch(error => console.log(error));
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(500).render("auth/recover", {
          messageError: error.message,
          email
        });
      } else if (error.code = 11000) {
        res.status(500).render("auth/recover", {
          messageError: error.message,
          email
        });
      } else {
        console.log(error);
      }
    });
});

router.get("/password/:id", isLoggedOut, (req, res) => {
  const userID = req.params.id
  res.render("auth/password", { userID });
});

router.post("/password/:id", isLoggedOut, (req, res) => {
  const { password, confirmPassword } = req.body;
  const userID = req.params.id;

  if (password === "" || confirmPassword === "") {
    res.send(400).render("auth/password", {
      messageError: "Both filds password shold be same",
      userID,
      password,
      confirmPassword
    })
    return
  } else if (password.toLowerCase() !== confirmPassword.toLowerCase()) {
    res.send(400).render("auth/password", {
      messageError: "Both filds password shold be same",
      userID,
      password,
      confirmPassword
    })
    return
  }

  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

  if (!regex.test(password)) {
    res.status(500).render("auth/password", {
      messageError: "Password needs to have at least 8 chars and must contain at least one number, one lowercase and one uppercase letter.",
      userID,
      password,
      confirmPassword
    });
    return;
  }
  bcrypt
    .genSalt(saltRounds)
    .then(salt => bcrypt.hash(password, salt))
    .then(hashPassword => {
      return User.updateOne({ _id: userID },
        {
          $set: { password: hashPassword },
        }
      )
    })
    .then(() => {
      res.render("auth/login", {
        messageSuccess: "You password are updated.",
      });
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(500).render("auth/password", {
          messageError: error.message,
          userID,
          password,
          confirmPassword
        });
      } else if (error.code = 11000) {
        res.status(500).render("auth/password", {
          messageError: error.message,
          userID,
          password,
          confirmPassword
        });
      } else {
        console.log(error);
      }
    });


});

router.get("/facebook", passport.authenticate("facebook"));
router.get("/facebook/callback", isLoggedOut,
  passport.authenticate("facebook", {
    failureRedirect: "/auth/signup",
    failureFlash: true,
    passReqToCallback: true
  }), (req, res) => {
    res.redirect("/private/orders")
  }
);

router.get("/google", passport.authenticate("google", {
  scope: [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email"
  ]
})
);

router.get("/google/callback", isLoggedOut,
  passport.authenticate("google", { failureRedirect: "/auth/signup" }),
  (req, res) => {
    req.session.currentUser = req.user.toObject();
    res.redirect("/private/orders")
  }
);

router.get("/logout", isLoggedIn, (req, res) => {
  req.session.destroy(err => {
    if (err) {
      res.status(500).render("private/orders", {
        messageError: err.message
      });
      return;
    }

    res.redirect("/");
  });
});

module.exports = router;