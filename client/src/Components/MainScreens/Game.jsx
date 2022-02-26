import React from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
const skills = require("../../LocalDatabase/skills");

const Game = () => {
  const [skillList, setSkillList] = useState(skills);
  const [chosenSkills, setChosenSkills] = useState([]);
  const [monster, setMonster] = useState({ test: "hi", test2: "hi" });
  const [lifeSteal, setLifesteal] = useState(true);

  const context = [skillList, setSkillList, chosenSkills, setChosenSkills, monster, setMonster, lifeSteal, setLifesteal]
  return (
    <div>
      <Outlet context={context} />
    </div>
  );
};

export default Game;
