const { Schema, model } = require("mongoose");

const SocialLoginSchema = new Schema(
  {
    username: {
      type: String,
      required: false,
      unique: false,
      trim: true
    },
    facebookId: String,
    googleID: String,
  },
  {
    timestamps: true
  }
);

const UserSocialLogin = model("UserSocialLogin", SocialLoginSchema);

module.exports = UserSocialLogin;