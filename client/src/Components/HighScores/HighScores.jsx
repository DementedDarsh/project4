import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

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
  const highScores = sortedScores?.map((item, index) => {
    return (
      <tr key={index}>
        <td>{index+1}</td>
        <td>{item.initialA}</td>
        <td>{item.initialB}</td>
        <td>{item.initialC}</td>
        <td>{item.score}</td>
      </tr>
    );
  });

  return (
    <div>
      HighScores
      <table style={{border: "1px solid gold", width: "60%", textAlign: "center"}}>
          <thead><tr><th>#</th><th colSpan={3}>Name</th><th>Score</th></tr></thead>
        <tbody>{highScores}</tbody>
      </table>
    </div>
  );
};

export default HighScores;
