import React from "react";
import "./style.css";

const Monster = (props) => {
  const currentMonster = props.currentMonster;
  const monsterHpWidth = props?.hp > 0 ? (props.hp * 101/ currentMonster.hp) : 0

  return (
    <div style={{ marginTop: "40px"}}>
      {currentMonster?.name}
      <br />
      <div id="monster-HPBar">
        <div id="monsterHP" style={{ width: ` ${monsterHpWidth}%` }}></div>
        <div id="monsterHPNumber">
          {props.hp > 0 ? props.hp : 0}/{currentMonster.hp}
        </div>
      </div>
      <img
        src={currentMonster?.imagePath}
        style={{ maxHeight: "300px", maxWidth: "300px" }}
      />
    </div>
  );
};

export default Monster;
