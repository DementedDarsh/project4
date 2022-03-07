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
import { skills } from "../../LocalDatabase/skills";
import { useNavigate } from "react-router-dom";

const BattleScreen = () => {
  const [monsters, setMonsters] = useState([]);
  const [weapons, setWeapons] = useState([]);
  const [currentMonster, setCurrentMonster] = useState("TEST");
  const [currentWeapon, setCurrentWeapon] = useState({});
  const [monsterHP, setMonsterHP] = useState(0);
  const [chosenSkills, setChosenSkills] = useState([]);
  const [combatLog, setCombatLog] = useState([]);
  const [level, setLevel] = useOutletContext();
  const [lifeSteal, setLifeSteal] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [playerHP, setPlayerHP] = useState(1000);
  const playerMaxHP = 1000;
  const playerHpWidth = playerHP > 0 ? (playerHP * 100) / playerMaxHP : 0;
  const navigate = useNavigate();

  const playerLoseGame = async () => {
    await monsterKill();
    setTimeout(() => {
        console.log("You died");
      }, 1000);
    navigate("/game/gameover", { replace: false });
    // formik.setFieldValue("killCount", currentMonster.killCount + 1);
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

    const getPlayer = async () => {
      if (localStorage.getItem("skills")) {
        await setChosenSkills(JSON.parse(localStorage.getItem("skills")));
      }
      ReactTooltip.rebuild();
      //   setChosenSkills(JSON.parse(localStorage.skills));
      //   setPlayerHP(parseInt(localStorage.playerHP))
    };
    getMonsters();
    getWeapons();
    getPlayer();
  }, []);

  const monsterKill = async () => {
      console.log(currentMonster._id);
    // const index = totalLikes?.findIndex((like) => {
    //   return like === userID;
    // });
    // if (index === -1) {
    //   const userArr = [userID];

    //   const newTotalLikes = totalLikes.concat(userArr);
    //   setTotalLikes(newTotalLikes);
      await axios.put(`/api/monster/killIncrease/${currentMonster._id}`);
      axios({
        method: "put",
        url: `/api/monster/killIncrease/${currentMonster._id}`,
      }).then((response) => {
        console.log(response);
      });
    // } else {
    //   const newTotalLikes = totalLikes?.filter((likes, i) => i !== index);
    //   setTotalLikes(newTotalLikes);
    //   await axios.put(`/api/images/${postID}/unlike`);
    // }
    // setIsUpdatedData(false);
  };

  const weaponStats = `Weapon Damage: ${currentWeapon.weaponDamage} <br /> Attack Speed: ${currentWeapon.attackSpeed} <br /> Hit Rate ${currentWeapon.hitRate} <br /> Crit Rate: ${currentWeapon.critRate}`;

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
    playerLoseGame: playerLoseGame,
    setLifeSteal: setLifeSteal,
    lifeSteal: lifeSteal,
  };

  return (
    <table style={{ width: "100%", height: "100%", marginLeft: "30px" }}>
      <thead>
        <tr>
          <th colSpan="2">TITLE</th>
        </tr>
      </thead>
      <tbody>
        <tr style={{ height: "550px" }}>
          <td
            className="battleArea"
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
                style={
                  playerHP > 0
                    ? { width: ` ${playerHpWidth}%` }
                    : { width: "0%", paddingRight: "0px" }
                }
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
              <span data-for="toolTip" data-tip={weaponStats}>
                <img
                  src={currentWeapon?.imagePath}
                  style={{ maxHeight: "120px", maxWidth: "120px" }}
                />
                <br />
                {currentWeapon.name}
              </span>
              <SkillBar skills={chosenSkills} gameState={gameState} />
            </div>
            <ReactTooltip
              id="toolTip"
              place="top"
              effect="solid"
              html={true}
              getContent={(dataTip) => `${dataTip}`}
            />
          </td>
          <td>
            {" "}
            <div
              className="statPoints"
              style={{
                textAlign: "center",
                marginTop: "auto",
                fontSize: "40px",
              }}
            >
              <p
                style={{
                  fontSize: "15px",
                  marginTop: "5px",
                  marginBottom: "-8px",
                }}
              >
                Level:{" "}
              </p>
              {level}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default BattleScreen;
