import React from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
const skills = require("../../LocalDatabase/skills");

const Game = () => {

  const [chosenSkills, setChosenSkills] = useState([]);

  const context = [chosenSkills, setChosenSkills]
  return (
    <div>
      <Outlet context={context} />
    </div>
  );
};

export default Game;
