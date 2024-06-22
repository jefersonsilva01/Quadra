const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: false,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['Pending Confirmation', 'Active']
    },
    imgPath: String,
    imgName: String,
    confirmationCode: String,
  },
  {
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;