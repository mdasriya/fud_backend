const express = require("express");
const { auth } = require("../middleware/auth.middleware");

const { WishlistModel } = require("../model/wishlist.model");
const wishlistRouter = express.Router();

wishlistRouter.get("/", auth, async (req, res) => {
  try {
    const products = await WishlistModel.find({ _id: userID });
    res.json({
      msg: `All products available in wishlist for ${userName}`,
      products,
    });
  } catch (error) {
    res.json({ err: error.message });
  }
});

// creating new Product in the wishlist with accepts id as a param
wishlistRouter.post("/create", auth, async (req, res) => {
  const {
    userID,
    username: user,
    brand,
    name,
    price,
    mrp,
    image1,
    image2,
    image3,
    rating,
  } = req.body;
  try {
    const product = new WishlistModel({
      userID,
      username: user,
      brand,
      name,
      price,
      mrp,
      image1,
      image2,
      image3,
      rating,
    });
    await product.save();
    res.json({
      mas: "New product has been added in the wishlist",
      product: {
        userID,
        username: user,
        brand,
        name,
        price,
        mrp,
        image1,
        image2,
        image3,
        rating,
      },
    });
  } catch (error) {
    res.json({ err: error.message });
  }
});

// deleting product from wishlist with id accepts id as a param
wishlistRouter.delete("/delete/:productID", auth, async (req, res) => {
  const { productID } = req.params;
  const product = await WishlistModel.findOne({ _id: productID });
  try {
    await WishlistModel.findByIdAndDelete({ _id: productID });
    res.json({ msg: `${product.name} has been deleted from wishlist` });
  } catch (error) {
    res.json({ error: error.message });
  }
});
module.exports = {
  wishlistRouter,
};
