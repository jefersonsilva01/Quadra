const { Schema, model } = require("mongoose");

const subscribeSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    }
  },
  {
    timestamps: true,
  }
);

const Subscribe = model("Subscribe", subscribeSchema);

module.exports = Subscribe;