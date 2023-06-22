const mongoose = require("mongoose");
const productSchema = mongoose.Schema(
  {
    brand: String,
    name: String,
    price: Number,
    mrp: Number,
    image1: String,
    image2: String,
    image3: String,
    rating: Number,
    category: String,
    description: String,
    instock: Number,
  },
  {
    versionKey: false,
  }
);

const ProductModel = mongoose.model("product", productSchema);

module.exports = {
  ProductModel,
};


