const express = require("express");
const router = express.Router();
const Weapon = require("../models/weaponModel")

// READ - get all weapons

router.get("/weapons", async (req, res) => {
  try {
    const weapons = await Weapon.find({});
    res
      .status(200)
      .json({ status: "ok", message: "Get Weapons", data: weapons });
  } catch (error) {
    res.json({ status: "not ok", message: error.message });
  }
});

// CREATE - post new weapon
router.post("/new", async (req, res) => {
  const newWeapon = {
    imagePath: req.body.imagePath,
    name: req.body.name,
    weaponDamage: req.body.weaponDamage,
    attackSpeed: req.body.attackSpeed,
    critRate: req.body.critRate,
    hitRate: req.body.hitRate,
    creatorID: req.body.creatorID
  };
  if (!newWeapon.imagePath) {
    res
      .status(400)
      .json({ status: "not ok", message: "Please upload an image" });
  }
  try {
    const createdNewWeapon = await Weapon.create(newWeapon);
    res.status(200).json({
      status: "ok",
      message: "created new weapon",
      data: createdNewWeapon,
    });
  } catch (error) {
    res.json({ status: "not ok", message: error.message });
  }
});

module.exports = router;
