import axios from "axios";
import { useEffect, createContext, useContext, useState } from "react";
import { Routes, Route, Navigate, useSearchParams, useOutletContext } from "react-router-dom";
const skills = require("../../LocalDatabase/skills");

const BattleScreen = () => {
  const [monsters, setMonsters] = useState([]);
  const [lifeSteal, setLifeSteal] = useState(false);
  const [currentMonster, setCurrentMonster] = useState({});
  const [testValue, setTestValue] = useState(200);
  const [disabled, setDisabled] = useState(false);
    const test = useOutletContext()

  const setRandomMonster = (monsters) => {
    setCurrentMonster(monsters[Math.floor(Math.random() * monsters?.length)]);
  };

  useEffect(() => {
    const getMonsters = async () => {
      const monsterData = await axios.get("/api/monster/monsters");
      setMonsters(monsterData.data.data);
      setRandomMonster(monsterData?.data?.data);
    //   skills.aimedStrike.effect(20, setDisabled);
    console.log(test)
    };
    getMonsters();
  }, []);

  // const monsterList = monsters?.map((item, index) => {return <div key={index}><img src={item.imagePath} style={{maxHeight: "300px", maxWidth: "400px"}}/><div>{item.hp}</div></div>})

  const monster = (
    <div>
      <img
        src={currentMonster?.imagePath}
        style={{ maxHeight: "300px", maxWidth: "400px" }}
      />
      <div>{currentMonster?.hp}</div>
    </div>
  );
  return (
    <div>
      {monster}
      {testValue}
    </div>
  );
};

export default BattleScreen;
