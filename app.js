require("dotenv/config");
require("./db");

const express = require("express");
const hbs = require("hbs");
const app = express();

require("./config")(app);

app.use('/', (req, res, next) => {
  res.locals.user = req.session.user
  next();
});

const index = require("./routes");
app.use("/", index);

require('./error-handling')(app);

module.exports = app;