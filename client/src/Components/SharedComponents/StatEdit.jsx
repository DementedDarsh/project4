import React from "react";
import "./style.css";

const StatEdit = (props) => {
  const stat = props.parameter;

  const handleClick = (value) => {
    props.setStats(value);
  };

  const testOb = {
    hp: "Each point increases HP stat by 50",
    attack: "Each point increases attack stat by 10",
    defense: "Each point increases defense stat by 10",
    weaponDamage: "Each point increases weapon damage by 10",
    attackSpeed: "Each point increases attack speed by 1",
    critRate: "Each point increases critical hit rate by 10",
    hitRate: "Each point increases hit rate by 20",
  };

  return (
    <table>
      <thead>
        <tr>
          <th style={{ width: "400px" }}></th>
          <th>
            <span
              className="icon square arrow up"
              onClick={() => handleClick("increase")}
            ></span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            {props.parameter[0].toUpperCase() + props.parameter.substring(1)}
          </td>
          <td style={{ textAlign: "center" }}>
            {props.stats[props.parameter]}
          </td>
        </tr>
        <tr>
          <td style={{ fontStyle: "italic", fontSize: "10px" }}>
              {testOb[props.parameter]}
          </td>
          <td>
            <span
              className="icon square arrow down"
              onClick={() => handleClick("decrease")}
            ></span>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default StatEdit;
