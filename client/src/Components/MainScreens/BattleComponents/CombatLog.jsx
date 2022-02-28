import React from "react";

const CombatLog = (props) => {
  const combatLogOutput = props.combatLog.map((item, index) => {
    return <p className="combatLogEntry" key={index}>{item}</p>;
  });
  return <div className="combatLog">{combatLogOutput}</div>;
};

export default CombatLog;
