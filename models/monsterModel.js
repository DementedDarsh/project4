const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const postImage = require("./postImagesModel");

const monsterSchema = Schema({
  imagePath: { type: String, required: true },
  name: { type: String, required: true },
  hp: { type: Number, required: true },
  attack: { type: Number, required: true },
  defense: { type: Number, required: true },
  killCount: { type: Number, default: 0 },
  creatorId: { type: String },
});

const Monster = mongoose.model("Monster", monsterSchema);

module.exports = Monster;
