const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    color: {
      type: String,
      required: true,
      unique: false,
      trim: true
    },
    addressCode: {
      type: String,
      required: true,
      unique: false,
    },
    city: {
      type: String,
      required: true,
      unique: false,
    },
    state: {
      type: String,
      required: true,
      unique: false,
    },
    street: {
      type: String,
      required: true,
      unique: false
    },
    number: {
      type: Number,
      required: true,
      unique: false,
    },
    cardName: {
      type: String,
      required: true,
      unique: false
    },
    cardNumber: {
      type: String,
      required: true,
      unique: false
    },
    expirateDate: {
      type: String,
      required: true,
      unique: false
    },
    cvc: {
      type: Number,
      required: true,
      unique: false
    },
    imgPath: String,
  },
  {
    timestamps: true
  }
)

const Order = model("Order", orderSchema);

module.exports = Order;