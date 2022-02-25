import axios from "axios";
import { useEffect, createContext, useContext, useState } from "react";
import { Routes, Route, Navigate, useSearchParams } from "react-router-dom";
const skills = require("../../LocalDatabase/skills")

const BattleScreen = () => {
const [monsters, setMonsters] = useState([]);
const [lifeSteal, setLifeSteal] = useState(false)

    useEffect(() => {
        const getMonsters = async () => {
          const monsterData = await axios.get("/api/monster/monsters");
          setMonsters(monsterData.data.data);
          skills.vampirism.effect(setLifeSteal);
        };
        getMonsters();
      }, []);

const monsterList = monsters?.map((item, index) => {return <div key={index}><img src={item.imagePath} style={{maxHeight: "300px", maxWidth: "400px"}}/><div>{item.hp}</div></div>})

  return (
    <div>{monsterList}</div>
    
  )
}

export default BattleScreen