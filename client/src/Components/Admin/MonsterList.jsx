import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";

const MonsterList = () => {
  const [monsterList, setMonsterList] = useState();
  const [update, setUpdate] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    const getKillCount = async () => {
      const killData = await (
        await axios.get("/api/monster/monsters")
      ).data.data;
      setMonsterList(killData);
    };
    getKillCount();
  }, []);

const deleteMonster = async (url) => {
  await axios({
    method: 'DELETE',
    url: url,
  });
  // setUpdate(prevState => !prevState);
  navigate(`/admin/monsters`, {
    replace: false,
  });
}

  const monsters = monsterList?.map((item, index) => {
    return (
     
      <table className="monsterCard" key={index}>
        <thead><tr><td>{item.name}</td><td><button onClick={() => deleteMonster(`http://localhost:3000/api/monster/${item._id}`)}>X</button></td></tr></thead>
        <tbody><tr><td><img src={item.imagePath} /></td></tr></tbody>
        <tfoot><tr><td>Kills: {item.killCount}</td></tr></tfoot>
      </table>
    );
  });
  return <div><Link to={`/`}><button className="buttonSubmit">Back</button></Link><div className="container">{monsters}</div></div>;
};

export default MonsterList;
