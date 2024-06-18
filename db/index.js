const mongoose = require("mongoose");

// Mongo connection development
// const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/quadra";

//Mongo connection production
const MONGO_URI = process.env.MONGO_URI_DEPLOY;

mongoose.connect(MONGO_URI)
  .then(x => {
    const databaseName = x.connections[0].name;
    console.log(`Connected to Mongo! Database name: "${databaseName}"`);
  })
  .catch(err => {
    console.log("Error connecting to mongo: ", err);
  });