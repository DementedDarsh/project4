import React from "react";

const StatEdit = (props) => {
  const stat = props.parameter;

  const handleClick = (value) => {
    props.setStats(value);
  };

  return (
    <table>
      <thead>
        <tr>
          <th style={{width: "200px"}}></th>
          <th> 
            <button type="button" onClick={() => handleClick("increase")}>Increase Stat</button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{props.parameter[0].toUpperCase() + props.parameter.substring(1)}</td>
          <td style={{textAlign: "center"}}>{props.stats[props.parameter]}</td>
        </tr>
        <tr>
          <td></td>
          <td>
            <button type="button" onClick={() => handleClick("decrease")}>Decrease Stat</button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default StatEdit;
