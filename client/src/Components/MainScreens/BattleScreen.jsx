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
import {skills} from "../../LocalDatabase/skills"

const BattleScreen = () => {
  const [monsters, setMonsters] = useState([]);
  const [weapons, setWeapons] = useState([]);
  const [currentMonster, setCurrentMonster] = useState("TEST");
  const [currentWeapon, setCurrentWeapon] = useState({});
  const [monsterHP, setMonsterHP] = useState(0);
  const [chosenSkills, setChosenSkills] = useOutletContext();
  const [combatLog, setCombatLog] = useState([]);
  const [level, setLevel] = useState(1);
  const [lifeSteal, setLifeSteal] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [playerHP, setPlayerHP] = useState(1000);
  const playerMaxHP = 1000;
  const playerHpWidth = playerHP > 0 ? (playerHP * 100/ playerMaxHP) : 0

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
        console.log(localStorage.skills);
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
        if(localStorage.getItem("skills")){
        setChosenSkills(JSON.parse(localStorage.getItem("skills")))}
    //   setChosenSkills(JSON.parse(localStorage.skills));
    //   setPlayerHP(parseInt(localStorage.playerHP))
    };

    getMonsters();
    getWeapons();
    getPlayer();
  }, []);

  const onTest = () => {
    console.log(skills.find((item) => item.name === "Vampirism").effect);
  };

  const gameState = {
    weapons: weapons,
    currentWeapon: currentWeapon,
    setCurrentWeapon: setCurrentWeapon,
    monsters: monsters,
    currentMonster: currentMonster,
    setCurrentMonster: setCurrentMonster,
    monsterHP: monsterHP,
    setMonsterHP: setMonsterHP,
    level: level,
    setLevel: setLevel,
    playerHP: playerHP,
    setPlayerHP: setPlayerHP,
    setCombatLog: setCombatLog,
    disabled: disabled,
    setDisabled: setDisabled,
  };

  return (
    <table style={{ width: "100%", height: "100%", marginLeft: "30px"}}>
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
              Level: {level}
            <Monster currentMonster={currentMonster} hp={monsterHP} />
            <div className="player-HPBar">
              <div
                className="playerHP"
                style={playerHP > 0 ? { width: ` ${playerHpWidth}%` }:{ width: "0%", paddingRight: "0px" } }
              ></div>
              <div className="playerHPNumber">
              {playerHP > 0 ? playerHP : 0}/{playerMaxHP}
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
              <ReactTooltip
        id="toolTip"
        place="bottom"
        effect="solid"
        getContent={(dataTip) => `${dataTip}`}
      ></ReactTooltip>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default BattleScreen;
