const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../model/userSchema");

const saltRound = 10;
// add new user
// check token
router.post("/register", async (req, res) => {
  let newUser = req.body;
  const oldUser = await User.findOne({ username: newUser.username });
  // check if the username is exist
  if (oldUser) {
    return res.status(409).json({ error: "Username already exist" });
  }
  //encrypt password
  const salt = bcrypt.genSaltSync(saltRound);
  newUser.password = bcrypt.hashSync(newUser.password, salt);
  await User.create(newUser);
  res.status(200).json({ message: "Register successfully. You can sign in now", username: newUser.username });
});

//login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  // compare user hash password with input password
  if (user && bcrypt.compareSync(password, user.password)) {
    // create jwt with timetolive
    const accessToken = jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET);
    res.status(200).json({ accessToken, username });
  } else {
    return res.status(401).json({ error: "Invalid credentials" });
  }
});

module.exports = router