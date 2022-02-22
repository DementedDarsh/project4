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
          <th></th>
          <th> 
            <button type="button" onClick={() => handleClick("increase")}>Increase Stat</button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{props.parameter}</td>
          <td>{props.stats[props.parameter]}</td>
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
