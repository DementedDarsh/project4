import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import logo from "../MainScreens/logo.png";

const MainMenu = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <img className="logo" src={logo} />
      <p>The Reckoning</p>
      <Link to={`/game/skills`}>
        <button className="button start">Start Game</button>
      </Link>
      <div>
        <Link to={`/highscores`}>
          <button className="button">Hall of Fame</button>
        </Link>
      </div>
      <div>
      <Link to={`/topMonsters`}>
        <button className="button">Top Monsters</button>
        </Link>
      </div>
      <div>
        <Link to={`/monster/create`}>
          <button className="button">Create a Monster</button>
        </Link>
        <Link to={`/weapon/create`}>
          <button className="button">Create a Weapon</button>
        </Link>
      </div>
    </div>
  );
};

export default MainMenu;
