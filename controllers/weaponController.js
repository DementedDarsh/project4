const express = require("express");
const router = express.Router();
const Weapon = require("../models/weaponModel")

// CREATE - post new weapon
router.post("/new", async (req, res) => {
  const newWeapon = {
    iconPath: req.body.iconPath,
    name: req.body.name,
    weaponDamage: req.body.weaponDamage,
    attackSpeed: req.body.attackSpeed,
    critRate: req.body.critRate,
    hitRate: req.body.hitRate,
  };
  if (!newWeapon.iconPath) {
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
