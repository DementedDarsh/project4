import React from "react";
import { useEffect } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

const YouDied = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => navigate("/game/gameover", { replace: false }), 5000)
  }, []);
//   const redirect = setTimeout(() => console.log("hello"), 5000);


  return (
    <div>
      <img
        id="youDied"
        src="https://res.cloudinary.com/djtovzgnc/image/upload/v1646893751/project4/hoegcp7h2p6kyfqhkbzt.jpg"
      />
    </div>
  );
};

export default YouDied;
