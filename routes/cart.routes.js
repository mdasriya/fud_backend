const express = require("express");

const { CartModel } = require("../model/cart.model");
const cartRouter = express.Router();

cartRouter.get("/", async (req, res) => {
  try {
    const products = await CartModel.find(req.body);
    res.json({
      msg: `All products available in Cart`,
      products,
    });
  } catch (error) {
    res.json({ err: error.message });
  }
});

// creating new Product in the cart with accepts id as a param
cartRouter.post("/create", async (req, res) => {
  const { brand, name, price, mrp, image1, image2, image3, rating, email,quantity } =
    req.body;
  try {
    const product = new CartModel({
      brand,
      name,
      price,
      mrp,
      image1,
      image2,
      image3,
      rating,
      email,
      quantity
    });
    await product.save();
    res.json({
      mas: "New product has been added Cart",
      product: {
        brand,
        name,
        price,
        mrp,
        image1,
        image2,
        image3,
        rating,
        email,
        quantity
      },
    });
  } catch (error) {
    res.json({ err: error.message });
  }
});

// upadating cart product with id accepts id as a param
cartRouter.patch("/update/:productID", async (req, res) => {
  const { productID } = req.params;
  const product = await CartModel.findOne({ _id: productID });
  try {
    await CartModel.findByIdAndUpdate({ _id: productID }, object);
    res.json({ msg: `${product.name} has been updated form cart` });
  } catch (error) {
    res.json({ error: error.message });
  }
});

// deleting product from cart with id accepts id as a param
cartRouter.delete("/delete/:productID", async (req, res) => {
  const { productID } = req.params;
  const product = await CartModel.findOne({ _id: productID });
  try {
    await CartModel.findByIdAndDelete({ _id: productID });
    res.json({ msg: `${product.name} has been deleted` });
  } catch (error) {
    res.json({ error: error.message });
  }
});
module.exports = {
  cartRouter,
};