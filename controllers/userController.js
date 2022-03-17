require("dotenv").config();
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
// const PASSWORD = process.env.PASSWORD;

//* sessions on log in
router.post("/login", async (req, res) => {
  try {
    const foundUser = await User.findOne({ username: req.body.username });
    if (!foundUser) {
      res.json({ status: "not ok", message: "No such user found." });
    } else {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        // console.log("Password match" + req.body.password);
        // if (req.body.password === "jimbobob"){
        res.json({ status: "ok", message: "user found", data: foundUser });
      } else {
        res.json({
          status: "not ok",
          message: "Incorrect Password",
        });
      }
    }
  } catch (error) {
    res.json({ status: "not ok", message: error.message });
  }
});

//* Create new user
router.post("/new", async (req, res) => {
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
  try {
    const createdUser = await User.create(req.body);
    console.log(createdUser);
    // localStorage.setItem("currentUser", JSON.stringify(createdUser))
    // req.session.currentUser = createdUser;
    // console.log("created user is: ", createdUser);
    res.json({ status: "ok", message: "user created", data: createdUser });
  } catch (error) {
    res.json({ status: "not ok", message: error.message });
  }
});

//* get all username - superadmin
router.get("/allusernames", async (req, res) => {
  try {
    const allUsernames = await User.find({});
    const usernames = [];
    allUsernames.forEach((user) => {
      usernames.push(user.username);
      // console.log(usernames)
      return usernames;
    });
    res
      .status(200)
      .json({ status: "ok", message: "get all username", data: usernames });
  } catch (error) {
    res.json({ status: "not ok", message: error.message });
  }
});

module.exports = router;
