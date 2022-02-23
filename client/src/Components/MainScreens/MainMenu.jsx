import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import logo from "../MainScreens/logo.png"

const MainMenu = () => {
  return (
    <div style={{textAlign: "center"}}>
      <img className="logo" src={logo} /><p>The Reckoning</p>
      <button className="button start">Start Game</button>
      <div>
        <button className="button">Hall of Fame</button>
      </div>
      <div>
        <button className="button">Top Monsters</button>
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
