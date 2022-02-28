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
const skills = require("../../LocalDatabase/skills");

const BattleScreen = () => {
  const [monsters, setMonsters] = useState([]);
  const [weapons, setWeapons] = useState([]);
  const [currentMonster, setCurrentMonster] = useState("TEST");
  const [currentWeapon, setCurrentWeapon] = useState({});
  const [monsterHP, setMonsterHP] = useState(currentMonster.hp);
  const [disabled, setDisabled] = useState(false);
  const [chosenSkills, setChosenSkills] = useOutletContext();
  const [lifeSteal, setLifeSteal] = useState(false);

  const randomMonster = () => {
    setCurrentMonster(monsters[Math.floor(Math.random() * monsters.length)]);
  };
  const randomWeapon = () => {
    setCurrentWeapon(weapons[Math.floor(Math.random() * weapons.length)]);
  };
  const test = () => {
      setMonsterHP(prevState => prevState - 50)
  }

  useEffect(() => {
    const getMonsters = async () => {
      const monsterData = await (
        await axios.get("/api/monster/monsters")
      ).data.data;
      //   console.log(monsterData);
      setMonsters(monsterData);
      const random = Math.floor(Math.random() * monsterData.length)
      setCurrentMonster(
        monsterData[random]
      );
      setMonsterHP(monsterData[random].hp)
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
    }

    getMonsters();
    getWeapons();
    getPlayer();
  }, []);

  const onTest = () => {
    console.log(skills.find((item) => item.name === "Vampirism").effect);
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

  const skillBar = chosenSkills.map((item, index) => {
    return (
      <span key={index}>
        {/* <button onClick={onTest}>Test</button> */}
        <img
          src={item.imagePath}
          style={{ height: "100px" }}
          //   onClick={() => item.effect()}
        />
        <br />
        {item.name}
      </span>
    );
  });
  return (
    <table style={{ width: "100%", height: "100%" }}>
      <thead>
        <tr>
          <th colSpan="2">TITLE</th>
        </tr>
      </thead>
      <tbody>
        <tr style={{ height: "550px" }}>
          <td onClick={test} style={{ width: "80%", textAlign: "center" }}><Monster currentMonster={currentMonster} hp={monsterHP}/></td>
          <td style={{ width: "20%" }}>LOG</td>
        </tr>
        <tr>
          <td colSpan="2">
            <span></span>
            <span style={{ display: "flex", flexDirection: "row" }}>
              {skillBar}
            </span>
          </td>
        </tr>
      </tbody>
    </table>

    // <div>
    //   {monster}
    //   {testValue}
    //   {skillBar}
    // </div>
  );
};

export default BattleScreen;
