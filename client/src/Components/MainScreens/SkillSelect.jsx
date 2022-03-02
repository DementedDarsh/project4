import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { skills } from "../../LocalDatabase/skills";

const SkillSelect = (props) => {
  const [skillList, setSkillList] = useState(skills);
  const [chosenSkills, setChosenSkills] = useState([]);
  const [skillPoints, setSkillPoints] = useState(5);

  const handleListClick = (e) => {
    if (skillPoints > 0) {
      setChosenSkills((prevState) => [...prevState, e]);
      //   const array = skillList;
      //   array.splice(array.indexOf(e), 1);
      //   console.log(array);
      //   setSkillList(array);
      console.log(chosenSkills);
      //   console.log(JSON.stringify(array));
      //   localStorage.setItem("skills", JSON.stringify(array));
      setSkillPoints((prevState) => prevState - 1);
    }
  };

  const handleChosenClick = (e) => {
    console.log(e);
    // setSkillList((prevState) => [...prevState, e]);
    const array = chosenSkills;
    array.splice(array.indexOf(e), 1);
    console.log(array);
    setChosenSkills(array);
    setSkillPoints((prevState) => prevState + 1);
  };

  const handleSubmit = () => {
    localStorage.clear();
    // console.log(chosenSkills);
    localStorage.setItem("skills", JSON.stringify(chosenSkills));
    // console.log(localStorage.skills)
    // localStorage.setItem("playerHP", "1000")
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
      <tr
        key={index}
        onClick={() => handleListClick(item)}
        style={
          chosenSkills.find((element) => element.name === item.name)
            ? {
                pointerEvents: "none",
                filter: "grayscale(1)",
              }
            : {}
        }
      >
        <td
          style={{
            height: "100px",
            textAlign: "center",
            verticalAlign: "center",
          }}
        >
          <img src={item.imagePath} style={{ height: "100px" }} />
          <br />
          {item.name}
        </td>
        <td>{item.tooltipText}</td>
      </tr>
    );
  });

  const skillsChosen = chosenSkills.map((item, index) => {
    return (
      <tr key={index} onClick={() => handleChosenClick(item)}>
        <td
          style={{
            height: "100px",
            textAlign: "center",
            verticalAlign: "center",
          }}
        >
          <img src={item.imagePath} style={{ height: "100px" }} />
          <br />
          {item.name}
        </td>
        <td>{item.tooltipText}</td>
      </tr>
    );
  });

  return (
    <div className="skillsContainer">
      <span>
        <table style={{ width: "500px" }}>
          <tbody>{skillsChosen}</tbody>
        </table>
      </span>
      <div style={{ margin: "auto" }}>
        {skillPoints} 
      </div>
      <span>
        <table style={{ width: "500px" }}>
          <tbody>{skillChoices}</tbody>
        </table>{" "}
      <Link to={`/game/battle`}>  <button onClick={handleSubmit} className="button">
          battle
        </button></Link>
      </span>
    </div>
  );
};

export default SkillSelect;
