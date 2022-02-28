import React from "react";
import "./style.css";

const Monster = (props) => {
  const currentMonster = props.currentMonster;
  const monsterHpWidth = props.hp * 100/ currentMonster.hp;

  return (
    <div >
      {currentMonster?.name}
      <br />
      <div id="monster-HPBar">
        <div id="monsterHP" style={{ width: ` ${monsterHpWidth}%` }}></div>
        <div id="monsterHPNumber">
          {props.hp}/{currentMonster.hp}
        </div>
      </div>
      <img
        src={currentMonster?.imagePath}
        style={{ maxHeight: "300px", maxWidth: "400px" }}
      />
    </div>
  );
};

export default Monster;
