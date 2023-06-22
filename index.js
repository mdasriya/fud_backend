const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/user.routes");
const { productRouter } = require("./routes/product.routes");
const { cartRouter } = require("./routes/cart.routes");
const { wishlistRouter } = require("./routes/wishlist.routes");
const cors = require("cors");
require("dotenv").config();
const app = express();

app.use(cors());

app.use(express.json());
app.use("/users", userRouter);
app.use("/carts", cartRouter);
app.use("/wishlists", wishlistRouter);
app.use("/products", productRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to DB");
    console.log(`Server Running at Port ${process.env.port}`);
  } catch (error) {
    console.log(error.message);
    console.log("Something went Wrong");
  }
});
