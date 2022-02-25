import { useState } from "react"
const skills = require("../../LocalDatabase/skills");

const SkillSelect = (props) => {
const [skillList, setSkillList] = useState(skills);

// const skillChoices = skillList.map((item, index) => {return (<div key={index}>item[index].name</div>)})
const test = Object.keys(skillList).map((item, index) => {
    return (<div key={skillList[item].name}>{skillList[item].name}</div>)
  });

  return (
    // <div><span></span><span>{skillChoices}</span></div>
    <div>{test}</div>
  )
}

export default SkillSelect