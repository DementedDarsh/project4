import React from "react";
import ReactTooltip from "react-tooltip";
const skills = require("../../../LocalDatabase/skills");

const SkillBar = (props) => {
  const skillBar = props.skills.map((item, index) => {
    return (
      <span key={index} className="tooltip">
        <span className="tooltiptext tooltip">{item.tooltipText}</span>
        <img
          src={item.imagePath}
          style={{ height: "100px" }}
          onClick={() =>
            skills.find((x) => x.name === item.name).effect(props.gameState)
          }
        />
        <br />
        {item.name}
      </span>
    );
  });
  return (
    <span
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "100%",
      }}
    >
      {skillBar}
    </span>
  );
};

export default SkillBar;
