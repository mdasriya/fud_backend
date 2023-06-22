const express = require("express");
const { auth } = require("../middleware/auth.middleware");

const { ProductModel } = require("../model/product.model");
const productRouter = express.Router();

// to fetch all products from the data base
// this route is kept public so we can see all products without login
productRouter.get("/", async (req, res) => {
  try {
    const products = await ProductModel.find(req.query);
    res.json({ msg: "All products Available", products });
  } catch (error) {
    res.json({ err: error.message });
  }
});

// this route is for gatting the product with id (single product route)
productRouter.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const product = await ProductModel.findOne({ _id: pid });
    res.json({ product: product });
  } catch (error) {
    res.json({ err: error.message });
  }
});

// creating new Product with id accepts id as a param
productRouter.post("/create", auth, async (req, res) => {
  const {
    brand,
    name,
    price,
    mrp,
    image1,
    image2,
    image3,
    rating,
    category,
    description,
    instock,
  } = req.body;
  try {
    const product = new ProductModel({
      brand,
      name,
      price,
      mrp,
      image1,
      image2,
      image3,
      rating,
      category,
      description,
      instock,
    });
    await product.save();
    res.json({
      mas: "New product has been added",
      product: {
        brand,
        name,
        price,
        mrp,
        image1,
        image2,
        image3,
        rating,
        category,
        description,
        instock,
      },
    });
  } catch (error) {
    res.json({ err: error.message });
  }
});

// upadating product with id accepts id as a param
productRouter.patch("/update/:productID", auth, async (req, res) => {
  const { productID } = req.params;
  const object = req.body;
  delete object.userID;
  delete object.user;
  const product = await ProductModel.findOne({ _id: productID });
  try {
    await ProductModel.findByIdAndUpdate({ _id: productID }, object);
    res.json({ msg: `${product.name} has been updated` });
  } catch (error) {
    res.json({ error: error.message });
  }
});

// deleting product with id accepts id as a param
productRouter.delete("/delete/:productID", auth, async (req, res) => {
  const { productID } = req.params;
  const product = await ProductModel.findOne({ _id: productID });
  try {
    await ProductModel.findByIdAndDelete({ _id: productID });
    res.json({ msg: `${product.name} has been deleted` });
  } catch (error) {
    res.json({ error: error.message });
  }
});
module.exports = {
  productRouter,
};
