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
    console.log("Hi");
  }
};

const hits = async (skill, weaponStats, states) => {
  for (let i = 0; i < weaponStats; i++) {
    states(true);
    skill(weaponStats, states);
    await interval();
  }
};

module.exports = [
  {
    name: "Imbue: Fire",
    tooltipText: "Imbues with fire",
    imagePath: "https://res.cloudinary.com/djtovzgnc/image/upload/v1645850009/project4/ip1rj8igc0aunx3jnn8d.png",
    effect: (weaponStats, states) => {
      console.log("Imbue Fire does additional damage for each hit");
    },
  },
  {
    name: "Aimed Strike",
    tooltipText: "An aimed attacked that never misses",
    imagePath: "https://res.cloudinary.com/djtovzgnc/image/upload/v1645850009/project4/ip1rj8igc0aunx3jnn8d.png",
    effect: async (weaponStats, states) => {
      const skill = (weaponStats, states) => console.log(weaponStats);
      await hits(skill, weaponStats, states);
      states(false);
    },
  },
  {
    name: "Rend Armor",
    tooltipText: "Destroys the target's defenses",
    imagePath: "https://res.cloudinary.com/djtovzgnc/image/upload/v1645850009/project4/ip1rj8igc0aunx3jnn8d.png",
    effect: (weaponStats, states) => {
      console.log("Destroys the target's defenses");
    },
  },
  {
    name: "Vampirism",
    tooltipText:
      "You thirst for blood, on the next attack, you heal life equals to the damage dealt",
    imagePath: "https://res.cloudinary.com/djtovzgnc/image/upload/v1645850009/project4/ip1rj8igc0aunx3jnn8d.png",
    effect: (setLifeSteal, setTestValue) => {
      setLifeSteal(true);
      //   this.enemyHit(Math.floor(Math.random() * 5));
      test(setTestValue);
    },
  },
];
