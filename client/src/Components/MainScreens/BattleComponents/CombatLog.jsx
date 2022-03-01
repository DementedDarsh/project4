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
              <button data-tip data-for="registerTip" style={{width: "100px"}}>
        Register
      </button>

      <ReactTooltip id="registerTip" place="bottom" effect="solid" padding="0px" maxWidth="50px">
        Tooltip for the register button
      </ReactTooltip>
      <table>
        <tbody>{combatLogOutput}</tbody>
      </table>
    </div>
  );
};

export default CombatLog;
