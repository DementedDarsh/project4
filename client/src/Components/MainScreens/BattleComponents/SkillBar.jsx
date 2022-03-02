import React from "react";
import ReactTooltip from "react-tooltip";
const skills = require("../../../LocalDatabase/skills");

const SkillBar = (props) => {
  const skillBar = props.skills.map((item, index) => {
    return (
      <span key={index} data-for="toolTip" data-tip={item?.tooltipText}>
        <img
          style={
            props.gameState.disabled === true
              ? {
                  pointerEvents: "none",
                  filter: "grayscale(1)",
                  height: "100px",
                }
              : { height: "100px" }
          }
          src={item.imagePath}
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
      <ReactTooltip
        id="toolTip"
        place="bottom"
        effect="solid"
        getContent={(dataTip) => `${dataTip}`}
      ></ReactTooltip>
    </span>
  );
};

export default SkillBar;
