import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "./style.css";
import { Link } from "react-router-dom";

const TopMonsters = () => {
  const [killCountList, setKillCountList] = useState();

  useEffect(() => {
    const getKillCount = async () => {
      const killData = await (
        await axios.get("/api/monster/monsters")
      ).data.data;
      setKillCountList(killData);
    };
    getKillCount();
  }, []);

  const sortedKills = killCountList?.sort((a, b) => b.killCount - a.killCount)
  const topMonsters = sortedKills?.slice(0, 15).map((item, index) => {
    return (
        
      <table className="monsterCard" key={index}>
        <thead><tr><td>{item.name}</td></tr></thead>
        <tbody><tr><td><img src={item.imagePath} /></td></tr></tbody>
        <tfoot><tr><td>Kills: {item.killCount}</td></tr></tfoot>
      </table>
    );
  });
  return <><Link to={`/`}><button className="buttonSubmit">Back</button></Link><div className="container">{topMonsters}</div></>;
};

export default TopMonsters;
