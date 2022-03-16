const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const postImage = require("./postImagesModel");

const userSchema = Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  initialA: { type: String, default: " " },
  initialB: { type: String, default: " " },
  initialC: { type: String, default: " " },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
