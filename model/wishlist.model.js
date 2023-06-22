const mongoose = require("mongoose");
const wishlistSchema = mongoose.Schema(
  {
    userID: String,
    username: String,
    brand: String,
    name: String,
    price: Number,
    mrp: Number,
    image1: String,
    image2: String,
    image3: String,
    rating: Number,
    
  },
  {
    versionKey: false,
  }
);

const WishlistModel = mongoose.model("wishlist", wishlistSchema);

module.exports = {
  WishlistModel,
};
