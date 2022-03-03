const express = require("express");
const router = express.Router();
const Score = require("../models/scoresModel");



// READ - get all scores

router.get("/scores", async (req, res) => {
    try {
      const scores = await Score.find({});
      res
        .status(200)
        .json({ status: "ok", message: "Get Scores", data: scores });
    } catch (error) {
      res.json({ status: "not ok", message: error.message });
    }
  });


// CREATE - post new score
router.post("/new", async (req, res) => {
  const newScore = {
    initialA: req.body.initialA,
    initialB: req.body.initialB,
    initialC: req.body.initialC,
    score: req.body.score,
  };
  if (!newScore.score) {
    res
      .status(400)
      .json({ status: "not ok", message: "Please play the game!" });
  }
  try {
    const createdNewScore = await Score.create(newScore);
    res.status(200).json({
      status: "ok",
      message: "created new score",
      data: createdNewScore,
    });
  } catch (error) {
    res.json({ status: "not ok", message: error.message });
  }
});

module.exports = router;
