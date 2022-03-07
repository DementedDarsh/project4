require("dotenv").config();
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

const PASSWORD = process.env.PASSWORD;

//* sessions on log in
router.post("/login", async (req, res) => {
  try {
    //   const foundUser = await User.findOne({ username: req.body.username });
    //   if (!foundUser) {
    //     res.json({ status: "not ok", message: "no user found" });
    //   } else {
    const hashedPassword = bcrypt.hashSync(PASSWORD, bcrypt.genSaltSync(10));
    console.log(req.body.password)
    if (bcrypt.compareSync(req.body.password, hashedPassword)) {
        // if (req.body.password === "jimbobob"){
      res.json({ status: "ok", message: "user found"});
    } else {
      res.json({ status: "Wrong Password", message: "password does not match" });
      // }
    }
  } catch (error) {
    res.json({ status: "not ok", message: error.message });
  }
});

module.exports = router;
