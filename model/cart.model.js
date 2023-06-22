const mongoose = require("mongoose");
const cartSchema = mongoose.Schema(
  {
    brand: String,
    name: String,
    price: Number,
    mrp: Number,
    image1: String,
    image2: String,
    image3: String,
    rating: Number,
    quantity: Number,
    email: String,
  },
  {
    versionKey: false,
  }
);

const CartModel = mongoose.model("cart", cartSchema);

module.exports = {
  CartModel,
};