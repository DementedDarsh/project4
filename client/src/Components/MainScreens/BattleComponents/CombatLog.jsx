import React from "react";
import ReactTooltip from "react-tooltip";
import "./style.css";

const CombatLog = (props) => {
  const combatLogOutput = props.combatLog.map((item, index) => {
    return (
      <tr
        className="combatLogEntry"
        key={index}
        style={
          index % 2 === 0
            ? { backgroundColor: "gray" }
            : { backgroundColor: "black" }
        }
      >
        <td>{item}</td>
      </tr>
    );
  });
  return (
    <div className="combatLog">
      <table>
        <tbody>{combatLogOutput}</tbody>
      </table>
    </div>
  );
};

export default CombatLog;
