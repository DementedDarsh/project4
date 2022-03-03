const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const postImage = require("./postImagesModel");

const scoreSchema = Schema({
  initialA: { type: String, required: false },
  initialB: { type: String, required: false },
  initialC: { type: String, required: false },
  score: { type: Number, required: true },
});

const Score = mongoose.model("Score", scoreSchema);

module.exports = Score;
