require("dotenv/config");
require("./db");

const express = require("express"),
  hbs = require("hbs"),
  app = express();

require("./config")(app);

app.use('/', (req, res, next) => {
  res.locals.user = req.session.user
  next();
});

const index = require("./routes");
app.use("/", index);

const auth = require("./routes/auth/auth");
app.use("/auth", auth);

const private = require("./routes/private/private");
app.use("/private", private);

require('./error-handling')(app);

module.exports = app;