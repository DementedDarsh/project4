const express = require("express");
const router = express.Router();
const Monster = require("../models/monsterModel");

// CREATE - post new monster
router.post("/new", async (req, res) => {
  const newMonster = {
    imagePath: req.body.imagePath,
    name: req.body.name,
    hp: req.body.hp,
    attack: req.body.attack,
    defense: req.body.defense,
  };
  if (!newMonster.imagePath) {
    res
      .status(400)
      .json({ status: "not ok", message: "Please upload an image" });
  }
  try {
    const createdNewMonster = await Monster.create(newMonster);
    res.status(200).json({
      status: "ok",
      message: "create new image post",
      data: createdNewMonster,
    });
  } catch (error) {
    res.json({ status: "not ok", message: error.message });
  }
});

module.exports = router;
