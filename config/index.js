const express = require("express"),
  passport = require('passport'),
  flash = require('connect-flash'),
  FacebookStrategy = require('passport-facebook'),
  GoogleStrategy = require('passport-google-oauth20').Strategy,
  favicon = require('serve-favicon'),
  logger = require("morgan"),
  cookieParser = require("cookie-parser"),
  path = require("path"),
  session = require("express-session"),
  MongoStore = require("connect-mongo"),
  socialLogin = require("../models/SocialLogin.model");

module.exports = (app) => {
  app.use(logger("dev"));

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.set("views", path.join(__dirname, "..", "views"));
  app.set("view engine", "hbs");
  app.use(express.static(path.join(__dirname, "..", "public")));
  app.use(favicon(path.join(__dirname, "..", 'public', 'images', 'favicon.ico')));

  app.use(
    session({
      secret: process.env.SESSION_SECRET || "secret key",
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI_DEPLOY
        // mongoUrl: process.env.MONGO_URI || "mongodb://localhost:27017/quadra",
      })
    })
  );

  passport.serializeUser((user, callback) => {
    callback(null, user._id);
  });

  passport.deserializeUser((req, id, callback) => {
    socialLogin.findById(id)
      .then(user => {
        if (user) {
          req.session.currentUser = user.toObject();
        }
        callback(null, user);
      })
      .catch(error => {
        callback(error);
      });
  });

  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "https://quadra-68d1b71920b6.herokuapp.com/auth/facebook/callback",
    // callbackURL: "http://localhost:3000/auth/facebook/callback",
    state: true,
    profileFields: ['id', 'name', 'email'],
    passReqToCallback: true
  },
    function (req, accessToken, refreshToken, profile, cb) {
      const id = profile.id,
        name = profile.name.givenName;
      // const email = profile.email;

      socialLogin.findOne({ facebookId: id })
        .then(user => {
          if (!user) {
            const newUser = new socialLogin(
              {
                username: name,
                facebookId: id,
                status: "Active",
                imgPath: "../images/avatar.jpg",
                imgName: 'Avatar',
                // email
              })

            newUser.save()
              .then(newUser => {
                req.session.currentUser = newUser.toObject();
                cb(null, newUser);
              })
              .catch(error => cb(error));
          } else {
            req.session.currentUser = user.toObject();
            cb(null, user);
          }
        })
        .catch(error => {
          console.log(error);
          cb(error);
        });
    }
  ));

  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // callbackURL: "https://quadra-68d1b71920b6.herokuapp.com/auth/google/callback",
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback: true
  }, (request, accessToken, refreshToken, profile, done) => {
    // to see the structure of the data in received response:
    if (profile.error) {
      console.error("Error retrieving Google profile:", profile.error);
      done(profile.error); // Retorna o erro para indicar falha na autenticação
      return;
    }

    socialLogin.findOne({ googleID: profile.id })
      .then(user => {
        if (user) {
          return done(null, user);
        }

        socialLogin.create(
          {
            username: profile.displayName,
            googleID: profile.id,
            status: "Active",
            imgPath: "../images/avatar.jpg",
            imgName: 'Avatar',
            email: profile._json.email
          }
        )
          .then(newUser => {
            done(null, newUser);
          })
          .catch(err => done(err)); // closes User.create()
      })
      .catch(err => done(err)); // closes User.findOne()
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(flash());
};