const interval = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("resolved");
    }, 500);
  });
};

const test = async (setTestValue) => {
  for (let i = 0; i < 5; i++) {
    await interval();
    setTestValue((prevState) => prevState - 50);
    console.log("Hi")
  }
};

const hits = async (skill, weaponStats, states) => {
    for (let i = 0; i < weaponStats; i++) {
        states(true)
        skill(weaponStats, states);
        await interval();
    }
}


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
    effect: async (weaponStats, states) => {
        const skill = (weaponStats, states) => console.log(weaponStats);
        await hits(skill, weaponStats, states);
        states(false)
        
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
    effect: (setLifeSteal, setTestValue) => {
      setLifeSteal(true);
      //   this.enemyHit(Math.floor(Math.random() * 5));
      test(setTestValue);
    },
  },
};
