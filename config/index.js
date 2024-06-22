const express = require("express");
const passport = require('passport');
const flash = require('connect-flash');
const FacebookStrategy = require('passport-facebook');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const favicon = require('serve-favicon');
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const SocialLogin = require("../models/SocialLogin.model");

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
        // mongoUrl: process.env.MONGO_URI_DEPLOY
        mongoUrl: process.env.MONGO_URI || "mongodb://localhost:27017/quadra",
      })
    })
  );

  passport.serializeUser((user, callback) => {
    callback(null, user._id);
  });

  passport.deserializeUser((id, callback) => {
    SocialLogin.findById(id)
      .then(user => {
        callback(null, user);
      })
      .catch(error => {
        callback(error);
      });
  });

  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    // callbackURL: "https://quadra-68d1b71920b6.herokuapp.com/auth/facebook/callback",
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    state: true,
    profileFields: ['id', 'name'],
  },
    function (accessToken, refreshToken, profile, cb) {
      const id = profile.id;
      const name = profile.name.givenName;

      SocialLogin.findOne({ facebookId: id })
        .then(user => {
          if (!user) {
            const newUser = new SocialLogin({ facebookId: id, username: name })

            newUser.save()
              .then(newUser => cb(null, newUser))
              .catch(error => cb(error));
          } else {
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

    SocialLogin.findOne({ googleID: profile.id, username: profile.displayName })
      .then(user => {
        if (user) {
          return done(null, user);
        }

        SocialLogin.create({ googleID: profile.id })
          .then(newUser => {
            done(null, newUser);
          })
          .catch(err => done(err)); // closes User.create()
      })
      .catch(err => done(err)); // closes User.findOne()
  }
  )
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(flash());
};