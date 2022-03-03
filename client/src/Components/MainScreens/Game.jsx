import React from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const Game = () => {
  const [level, setLevel] = useState(1);
  const [chosenSkills, setChosenSkills] = useState([]);

  const context = [level, setLevel]
  return (
    <div>
      <Outlet context={context} />
    </div>
  );
};

export default Game;
