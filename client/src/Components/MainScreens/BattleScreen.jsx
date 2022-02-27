import axios from "axios";
import { useEffect, createContext, useContext, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useSearchParams,
  useOutletContext,
} from "react-router-dom";

const BattleScreen = () => {
  const [monsters, setMonsters] = useState([]);
  const [lifeSteal, setLifeSteal] = useState(false);
  const [currentMonster, setCurrentMonster] = useState({});
  const [testValue, setTestValue] = useState(200);
  const [disabled, setDisabled] = useState(false);
  const [chosenSkills, setChosenSkills] = useOutletContext();

  const setRandomMonster = (monsters) => {
    setCurrentMonster(monsters[Math.floor(Math.random() * monsters?.length)]);
  };

  useEffect(() => {
    const getMonsters = async () => {
      const monsterData = await axios.get("/api/monster/monsters");
      setMonsters(monsterData.data.data);
      setRandomMonster(monsterData?.data?.data);
      console.log(chosenSkills)
      chosenSkills[1].effect(1,2)
      //   skills.aimedStrike.effect(20, setDisabled);
    //   console.log(test);
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

  const skillBar = chosenSkills.map((item, index) => {
    return (
      <span key={index} >
        <img src={item.imagePath} style={{ height: "100px" }} onClick={() => item.effect()}/>
        <br />
        {item.name}
      </span>
    );
  });
  return (
    <div>
      {monster}
      {testValue}
      {skillBar}
    </div>
  );
};

export default BattleScreen;
