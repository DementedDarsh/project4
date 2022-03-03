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
  for (let i = 0; i < gameState.currentWeapon.attackSpeed; i++) {
    // states(true);
    skill(gameState);
    await interval();
  }
};

const hitCalc = async (gameState) => {
  if (gameState.currentWeapon.hitRate > Math.random() * 100) {
    return true;
  }
};

const critCalc = async (gameState) => {
  if (gameState.currentWeapon.critRate > Math.random() * 100) {
    return true;
  }
};

const combatLogAdd = (gameState, string) => {
  gameState.setCombatLog((prevState) => [...prevState, string]);
  document.querySelector(".combatLog").scrollTop =
    document.querySelector(".combatLog").scrollHeight;
};

const monsterAttack = async (gameState) => {
  await interval();
  const x = gameState.currentMonster.attack;
  await gameState.setPlayerHP((prevState) => prevState - x);
  // localStorage.setItem("playerHP", JSON.stringify(gameState.playerHP - x));
  console.log(localStorage.playerHP);
  const combatLogEntry = `${gameState.currentMonster.name} attacks! You took ${x} damage`;
  combatLogAdd(gameState, combatLogEntry);
  if (gameState.playerHP - x < 0) {
    combatLogAdd(gameState, "You died");
    gameState.playerLoseGame();
  }
  await gameState.setDisabled(false);
};

const playerEnd = async (gameState, newMonsterHP) => {
  if (newMonsterHP > 0) {
    gameState.setDisabled(true);
    await monsterAttack(gameState);
  } else {
    combatLogAdd(gameState, "Monster died");
    setNewMonster(gameState);
    gameState.setDisabled(false);
  }
  const random = Math.floor(Math.random() * gameState.weapons.length);
  gameState.setCurrentWeapon(gameState.weapons[random]);
};

const setNewMonster = (gameState) => {
  gameState.setLevel((prevState) => prevState + 1);
  const multiplier = gameState.level * 2 + 10;
  console.log(multiplier);
  const random = Math.floor(Math.random() * gameState.monsters.length);
  // let newMonster = gameState.monsters[random];
  // newMonster = (prevState) => ({
  //   ...prevState,
  //   hp: prevState.hp * multiplier,
  //   attack: prevState.attack * multiplier,
  //   defense: prevState.defense * multiplier,
  // });
  gameState.setCurrentMonster(gameState.monsters[random]);
  gameState.setCurrentMonster((prevState) => ({
    ...prevState,
    hp: (prevState.hp * multiplier) / 10,
    attack: (prevState.attack * multiplier) / 10,
    defense: (prevState.defense * multiplier) / 10,
  }));
  gameState.setMonsterHP(gameState.monsters[random].hp);
  gameState.setMonsterHP((prevState) => (prevState * multiplier) / 10);
  const newMonsterString = `A wild ${gameState.monsters[random].name} appeared!`;
  combatLogAdd(gameState, newMonsterString);
};

const skills = [
  {
    name: "Imbue: Fire",
    tooltipText: "Imbues with fire",
    imagePath:
      "https://res.cloudinary.com/djtovzgnc/image/upload/v1646202142/project4/ek2rhi2vs09pthbv54fd.png",
    effect: async (gameState) => {
      gameState.setDisabled(true);
      let newMonsterHP = gameState.monsterHP;
      for (let i = 0; i < gameState.currentWeapon.attackSpeed; i++) {
        const x = 20;
        const hit = await hitCalc(gameState);
        if (hit === true) {
          const crit = await critCalc(gameState);
          if (crit === true) {
            await gameState.setMonsterHP(
              (prevState) =>
                prevState - (x + gameState.currentWeapon.weaponDamage * 2)
            );
            newMonsterHP =
              newMonsterHP - (x + gameState.currentWeapon.weaponDamage * 2);
            console.log(newMonsterHP);
            combatLogAdd(
              gameState,
              `Critical Hit! You dealt ${
                gameState.currentWeapon.weaponDamage * 2
              } with your weapon, and an additional ${x} burn damage!`
            );
          } else {
            await gameState.setMonsterHP(
              (prevState) =>
                prevState - (x + gameState.currentWeapon.weaponDamage)
            );
            newMonsterHP =
              newMonsterHP - (x + gameState.currentWeapon.weaponDamage);
            console.log(newMonsterHP);
            combatLogAdd(
              gameState,
              `You dealt ${gameState.currentWeapon.weaponDamage} with your weapon, and an additional ${x} burn damage!`
            );
          }
        } else {
          combatLogAdd(gameState, `Your attack missed!`);
        }
        await interval();
      }
      await playerEnd(gameState, newMonsterHP);
    },
  },
  {
    name: "Aimed Strike",
    tooltipText: "An aimed attacked that never misses",
    imagePath:
      "https://res.cloudinary.com/djtovzgnc/image/upload/v1645849941/project4/ky8zcy7eryeloiyexfwu.png",
    effect: async (gameState) => {
      test(gameState);
      // const skill = (currentWeapon, states) => console.log(currentWeapon);
      // await hitAmount(skill, currentWeapon, states);
      //   states(false);
    },
  },
  {
    name: "Rend Armor",
    tooltipText: "Destroys the target's defenses",
    imagePath:
      "https://res.cloudinary.com/djtovzgnc/image/upload/v1645850009/project4/ip1rj8igc0aunx3jnn8d.png",
    effect: (currentWeapon, states) => {
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

export { skills as skills };
