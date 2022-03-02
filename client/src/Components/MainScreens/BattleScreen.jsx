import "./battleStyle.css";
import axios from "axios";
import { useEffect, createContext, useContext, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useSearchParams,
  useOutletContext,
} from "react-router-dom";
import Monster from "./BattleComponents/Monster";
import SkillBar from "./BattleComponents/SkillBar";
import CombatLog from "./BattleComponents/CombatLog";
import ReactTooltip from "react-tooltip";
const skills = require("../../LocalDatabase/skills");

const BattleScreen = () => {
  const [monsters, setMonsters] = useState([]);
  const [weapons, setWeapons] = useState([]);
  const [currentMonster, setCurrentMonster] = useState("TEST");
  const [currentWeapon, setCurrentWeapon] = useState({});
  const [monsterHP, setMonsterHP] = useState(currentMonster.hp);
  const [chosenSkills, setChosenSkills] = useOutletContext();
  const [combatLog, setCombatLog] = useState([]);
  const [lifeSteal, setLifeSteal] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [playerHP, setPlayerHP] = useState(600);
  const playerMaxHP = 1000;

  const randomMonster = () => {
    setCurrentMonster(monsters[Math.floor(Math.random() * monsters.length)]);
  };
  const randomWeapon = () => {
    setCurrentWeapon(weapons[Math.floor(Math.random() * weapons.length)]);
  };
  const test = () => {
    setMonsterHP((prevState) => prevState - 50);
  };

  useEffect(() => {
    const getMonsters = async () => {
      const monsterData = await (
        await axios.get("/api/monster/monsters")
      ).data.data;
      //   console.log(monsterData);
      setMonsters(monsterData);
      const random = Math.floor(Math.random() * monsterData.length);
      setCurrentMonster(monsterData[random]);
      setMonsterHP(monsterData[random].hp);
    };
    const getWeapons = async () => {
      const weaponData = await (
        await axios.get("/api/weapon/weapons")
      ).data.data;
      setWeapons(weaponData);
      setCurrentWeapon(
        weaponData[Math.floor(Math.random() * weaponData.length)]
      );
    };

    const getPlayer = () => {
      setChosenSkills(JSON.parse(localStorage.skills));
    };

    getMonsters();
    getWeapons();
    getPlayer();
  }, []);

  const onTest = () => {
    console.log(skills.find((item) => item.name === "Vampirism").effect);
  };

  const gameState = {
    weapon: currentWeapon,
    monster: currentMonster,
    monsterHP: monsterHP,
    setMonsterHP: setMonsterHP,
    setCombatLog: setCombatLog,
    disabled: disabled,
    setDisabled: setDisabled,
  };

  // const monsterList = monsters?.map((item, index) => {return <div key={index}><img src={item.imagePath} style={{maxHeight: "300px", maxWidth: "400px"}}/><div>{item.hp}</div></div>})

  //   const monster = (
  //     <div>
  //       {currentMonster?.name}
  //       <br />
  //       <img
  //         src={currentMonster?.imagePath}
  //         style={{ maxHeight: "300px", maxWidth: "400px" }}
  //       />
  //       <div>{currentMonster?.hp}</div>
  //     </div>
  //   );

  //   const skillBar = chosenSkills.map((item, index) => {
  //     return (
  //       <span key={index}>
  //         {/* <button onClick={onTest}>Test</button> */}
  //         <img
  //           src={item.imagePath}
  //           style={{ height: "100px" }}
  //           //   onClick={() => item.effect()}
  //         />
  //         <br />
  //         {item.name}
  //       </span>
  //     );
  //   });
  return (
    <table style={{ width: "100%", height: "100%" }}>
      <thead>
        <tr>
          <th colSpan="2">TITLE</th>
        </tr>
      </thead>
      <tbody>
        <tr style={{ height: "550px" }}>
          <td
            className="battleArea"
            onClick={test}
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              width: "100%",
              justifyContent: "space-between",
              textAlign: "center",
            }}
          >
            <Monster currentMonster={currentMonster} hp={monsterHP} />
            <div className="player-HPBar">
              <div
                className="playerHP"
                style={{ width: ` ${(playerHP * 100) / playerMaxHP}%` }}
              ></div>
              <div className="playerHPNumber">
                {playerHP}/{playerMaxHP}
              </div>
            </div>
          </td>
          <td style={{ width: "25%" }}>
            <CombatLog combatLog={combatLog} />
          </td>
        </tr>
        <tr>
          <td>
            <div className="toolbar">
              <span data-for="toolTip" data-tip={currentWeapon.weaponDamage}>
                <img
                  src={currentWeapon?.imagePath}
                  style={{ maxHeight: "120px", maxWidth: "120px" }}
                />
                <br />
                {currentWeapon.name}
              </span>
              <ReactTooltip
                id="toolTip"
                place="bottom"
                effect="solid"
                getContent={(dataTip) => `${dataTip}`}
              />
              <SkillBar skills={chosenSkills} gameState={gameState} />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default BattleScreen;
