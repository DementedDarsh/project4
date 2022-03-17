import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "./style.css";
import { Link } from "react-router-dom";

const UserWeapons = (props) => {
  const [weaponList, setWeaponList] = useState();
  const [update, setUpdate] = useState(false)

  useEffect(() => {
    const getKillCount = async () => {
      const allWeapons = await (
        await axios.get("/api/weapon/weapons")
      ).data.data;
      setWeaponList(allWeapons);
    };
    getKillCount();
  }, [update]);

const deleteWeapon = async (url) => {
  await axios({
    method: 'DELETE',
    url: url,
  });
  setUpdate(prevState => !prevState);
}
const filteredWeapons = weaponList?.filter((item) => item.creatorID === props.user.userID)
  const weapons = filteredWeapons?.map((item, index) => {
    return (
      <table className="monsterCard" key={index}>
        <thead><tr><td>{item.name}</td><td><button className="delete" onClick={() => deleteWeapon(`/api/monster/${item._id}`)}>X</button></td></tr></thead>
        <tbody><tr><td colSpan="2"><img src={item.imagePath} style={{height: "150px", width: "auto"}} alt="weapon"/></td></tr></tbody>
      </table>
    );
  });
  return <div><Link to={`/`}><button className="buttonSubmit">Back</button></Link><div className="container">{weapons}</div></div>;
};

export default UserWeapons;
