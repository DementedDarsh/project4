import { useState } from "react";
const skills = require("../../LocalDatabase/skills");

const SkillSelect = (props) => {
  const [skillList, setSkillList] = useState(skills);
  const [chosenSkills, setChosenSkills] = useState([]);

  const handleListClick = (e) => {
    console.log(e);
    setChosenSkills((prevState) => [...prevState, e]);
    const array = skillList;
    array.splice(array.indexOf(e), 1);
    console.log(array);
    setSkillList(array);
  };

  const handleChosenClick = (e) => {
    console.log(e);
    setSkillList((prevState) => [...prevState, e]);
    const array = chosenSkills;
    array.splice(array.indexOf(e), 1);
    console.log(array);
    setChosenSkills(array);
  };

  //   const skillChoices = skillList.map((item, index) => {
  //     return (
  //       <div onClick={() => handleListClick(item)} key={index}>
  //         {item.name}
  //       </div>
  //     );
  //   });

  const skillChoices = skillList.map((item, index) => {
    return (
      <tr key={index} onClick={() => handleListClick(item)}>
        <td style={{ height: "100px" }}>
          <img src={item.imagePath} style={{ height: "100px" }} /><br />
          {item.name}
        </td>
        <td>{item.tooltipText}</td>
      </tr>
    );
  });

  const skillsChosen = chosenSkills.map((item, index) => {
    return (
      <tr key={index} onClick={() => handleChosenClick(item)}>
        <td style={{ height: "100px", textAlign: "center", verticalAlign: "center"}}>
          <img src={item.imagePath} style={{ height: "100px" }} /><br />
          {item.name}
        </td>
        <td>{item.tooltipText}</td>
      </tr>
    );
  });

  return (
    <div className="skillsContainer">
      <span>
        <table style={{width: "500px"}}>
          <tbody>{skillsChosen}</tbody>
        </table>
      </span>
      <span>
        <table style={{width: "500px"}}>
          <tbody>{skillChoices}</tbody>
        </table>
      </span>
    </div>
  );
};

export default SkillSelect;
