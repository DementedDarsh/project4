const express = require("express");
const router = express.Router();
const Monster = require("../models/monsterModel");

// READ - get all monsters

router.get("/monsters", async (req, res) => {
  try {
    const monsters = await Monster.find({});
    res
      .status(200)
      .json({ status: "ok", message: "Get Monsters", data: monsters });
  } catch (error) {
    res.json({ status: "not ok", message: error.message });
  }
});

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
      message: "created new monster",
      data: createdNewMonster,
    });
  } catch (error) {
    res.json({ status: "not ok", message: error.message });
  }
});

// UPDATE - increase kill count
router.put("/killIncrease/:monsterID", async (req, res) => {
  const { monsterID } = req.params;
  const monster = req.body;
  console.log(monster)
  try {
    const foundMonster = await Monster.findById(monsterID);
    foundMonster.killCount += 1;
    foundMonster.save();
    res.status(200).json({
      status: "ok",
      message: "Monster killed player",
      data: foundMonster,
    });
  } catch (error) {
    res.json({ status: "not ok", message: error.message });
  }
});

module.exports = router;
