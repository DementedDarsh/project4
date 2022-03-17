import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const HighScores = () => {
  const [scoreList, setScoreList] = useState();

  useEffect(() => {
    const getScores = async () => {
      const scoreData = await (await axios.get("/api/scores/scores")).data.data;
      setScoreList(scoreData);
    };
    getScores();
  }, []);

  const sortedScores = scoreList?.sort((a, b) => b.score - a.score);
  const highScores = sortedScores?.slice(0,20) .map((item, index) => {
    return (
      <tr key={index}>
        <td className="score" style={{fontSize: "40px"}}>{index+1}</td>
        <td className="score" style={{fontSize: "40px"}}>{item.initialA}</td>
        <td className="score" style={{fontSize: "40px"}}>{item.initialB}</td>
        <td className="score" style={{fontSize: "40px"}}>{item.initialC}</td>
        <td className="score" style={{fontSize: "40px"}}>{item.score}</td>
      </tr>
    );
  });

  return (
    <div>
      <Link to={`/`}><button className="buttonSubmit">Back</button></Link>
      <table className="scoreTable" style={{border: "1px solid gold", width: "60%", textAlign: "center"}}>
          <thead className="scoreHead"><tr><th>#</th><th colSpan={3}>Name</th><th>Score</th></tr></thead>
        <tbody>{highScores}</tbody>
      </table>
    </div>
  );
};

export default HighScores;
