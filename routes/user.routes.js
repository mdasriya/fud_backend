const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { UserModel } = require("../model/user.model");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { pass, name, email, gender, age, city, phone_no } = req.body;
  const alreadyUser = await UserModel.findOne({ email });
  if (alreadyUser) {
    res.status(200).json({ msg: "User already exist, please login" });
  } else {
    try {
      bcrypt.hash(pass, 5, async (err, hash) => {
        if (err) {
          res.status(200).json({ error: err.message });
        } else {
          const user = new UserModel({
            pass: hash,
            name,
            email,
            gender,
            age,
            city,
            phone_no,
          });
          await user.save();
          res.status(200).json({
            msg: "new user has been added succssfully",
            user: req.body,
          });
        }
      });
    } catch (error) {
      res.status(400).json({ error: err.message });
    }
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(pass, user.pass, (err, result) => {
        if (result) {
          let token = jwt.sign(
            { userID: user._id, user: user.name },
            process.env.secret
          );
          res.json({ msg: "Login Successfull", token   });
        } else {
          res.json({ msg: "Wrong Cridentials" });
        }
      });
    } else {
      res.json({ msg: "User does not exist" });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = {
  userRouter,
};
