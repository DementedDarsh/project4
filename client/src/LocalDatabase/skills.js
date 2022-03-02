const interval = (gameState) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("resolved");
    }, 500);
  });
};

const test = async (gameState) => {
  for (let i = 0; i < 5; i++) {
    gameState.setDisabled(true);
    await interval();
    console.log("Hi");
    gameState.setDisabled(false);
  }
};

const hitAmount = async (gameState, skill) => {
  for (let i = 0; i < gameState.weapon.attackSpeed; i++) {
    // states(true);
    skill(gameState);
    await interval();
  }
};

const hitCalc = async (gameState) => {
  if (gameState.weapon.hitRate > Math.random() * 100) {
    return true;
  }
};

const critCalc = async (gameState) => {
  if (gameState.weapon.critRate > Math.random() * 100) {
    return true;
  }
};

const combatLogAdd = (gameState, string) => {
  gameState.setCombatLog((prevState) => [...prevState, string]);
  document.querySelector(".combatLog").scrollTop =
    document.querySelector(".combatLog").scrollHeight;
};

module.exports = [
  {
    name: "Imbue: Fire",
    tooltipText: "Imbues with fire",
    imagePath:
      "https://res.cloudinary.com/djtovzgnc/image/upload/v1645850009/project4/ip1rj8igc0aunx3jnn8d.png",
    effect: async (gameState) => {
      gameState.setDisabled(true);
      for (let i = 0; i < gameState.weapon.attackSpeed; i++) {
        const x = 20;
        const hit = await hitCalc(gameState);
        if (hit === true) {
          const crit = await critCalc(gameState);
          if (crit === true) {
            gameState.setMonsterHP(
              (prevState) => prevState - (x + gameState.weapon.weaponDamage * 2)
            );
            combatLogAdd(
              gameState,
              `Critical Hit! You dealt ${
                gameState.weapon.weaponDamage * 2
              } with your weapon, and an additional ${x} burn damage!`
            );
          } else {
            gameState.setMonsterHP(
              (prevState) => prevState - (x + gameState.weapon.weaponDamage)
            );
            combatLogAdd(
              gameState,
              `You dealt ${gameState.weapon.weaponDamage} with your weapon, and an additional ${x} burn damage!`
            );
          }
        } else {
          combatLogAdd(gameState, `Your attack missed!`);
        }
        await interval();
      }
      gameState.setDisabled(false);
    },
  },
  {
    name: "Aimed Strike",
    tooltipText: "An aimed attacked that never misses",
    imagePath:
      "https://res.cloudinary.com/djtovzgnc/image/upload/v1645850009/project4/ip1rj8igc0aunx3jnn8d.png",
    effect: async (gameState) => {
      test(gameState);
      // const skill = (weapon, states) => console.log(weapon);
      // await hitAmount(skill, weapon, states);
      //   states(false);
    },
  },
  {
    name: "Rend Armor",
    tooltipText: "Destroys the target's defenses",
    imagePath:
      "https://res.cloudinary.com/djtovzgnc/image/upload/v1645850009/project4/ip1rj8igc0aunx3jnn8d.png",
    effect: (weapon, states) => {
      console.log("Destroys the target's defenses");
    },
  },
  {
    name: "Vampirism",
    tooltipText:
      "You thirst for blood, on the next attack, you heal life equals to the damage dealt",
    imagePath:
      "https://res.cloudinary.com/djtovzgnc/image/upload/v1645850009/project4/ip1rj8igc0aunx3jnn8d.png",
    effect: (gameState) => {},
  },
];
