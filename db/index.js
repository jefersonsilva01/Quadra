// Mongo connection development
/* const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/quadra";

mongoose.connect(MONGO_URI)
.then(x => {
  const databaseName = x.connections[0].name;
  console.log(`Connected to Mongo! Database name: "${databaseName}"`);
  })
  .catch(err => {
    console.log("Error connecting to mongo: ", err);
    }); */

//Mongo connection production
const { MongoClient, ServerApiVersion } = require('mongodb');

const MONGO_URI = process.env.MONGO_URI_DEPLOY;

const client = new MongoClient(MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);