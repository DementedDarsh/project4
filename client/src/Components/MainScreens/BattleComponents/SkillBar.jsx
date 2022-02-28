import React from "react";
const skills = require("../../../LocalDatabase/skills");

const SkillBar = (props) => {

  const skillBar = props.skills.map((item, index) => {
    return (
      <span key={index}>
        <img
          src={item.imagePath}
          style={{ height: "100px" }}
            onClick={() => skills.find(x => x.name === item.name).effect(props.gameState)}
        />
        <br />
        {item.name}
      </span>
    );
  });
  return <>{skillBar}</>;
};

export default SkillBar;
