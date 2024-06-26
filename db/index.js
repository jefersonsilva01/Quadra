require("dotenv/config")

const mongoose = require("mongoose"),

  MONGO_URI = process.env.MONGO_URI_DEPLOY;
// MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/quadra";

mongoose.connect(MONGO_URI)
  .then(x => {
    const databaseName = x.connections[0].name;
    console.log(`Connected to Mongo! Database name: "${databaseName}"`);
  })
  .catch(err => {
    console.log("Error connecting to mongo: ", err);
  });