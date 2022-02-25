module.exports = {
  imbueFire: {
    name: "Imbue: Fire",
    tooltipText: "Imbues with fire",
    imagePath: "test",
    effect: (weaponStats, states) => {
      console.log("Imbue Fire does additional damage for each hit");
    },
  },
  aimedStrike: {
    name: "Aimed Strike",
    tooltipText: "An aimed attacked that never misses",
    imagePath: "test",
    effect: (weaponStats, states) => {
      console.log("An aimed attacked that never misses");
    },
  },
  rendArmor: {
    name: "Rend Armor",
    tooltipText: "Destroys the target's defenses",
    imagePath: "test",
    effect: (weaponStats, states) => {
      console.log("Destroys the target's defenses");
    },
  },
  vampirism: {
    name: "Vampirism",
    tooltipText:
      "You thirst for blood, on the next attack, you heal life equals to the damage dealt",
    imagePath: "test",
    effect: (setLifeSteal) => {
      setLifeSteal(true);
    },
  },
};
