import logo from "./logo.svg";
import "./App.css";
import MonsterCreator from "./Components/MonsterCreator/MonsterCreator";
import { Routes, Route, Navigate, useSearchParams } from "react-router-dom";
import WeaponCreator from "./Components/WeaponCreator/WeaponCreator";
import MainScreen from "./Components/MainScreens/MainMenu";
import BattleScreen from "./Components/MainScreens/BattleScreen";
import SkillSelect from "./Components/MainScreens/SkillSelect";
import Game from "./Components/MainScreens/Game";
import GameOver from "./Components/MainScreens/GameOver";
import HighScores from "./Components/HighScores/HighScores";
import TopMonsters from "./Components/HighScores/TopMonsters";
import AdminLogin from "./Components/Admin/AdminLogin";
import MonsterList from "./Components/Admin/MonsterList";
import YouDied from "./Components/MainScreens/YouDied";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainScreen />} />
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/game" element={<Game />}>
        <Route path="battle" element={<BattleScreen />} />
        <Route path="skills" element={<SkillSelect />} />{" "}
        <Route path="youdied" element={<YouDied />} />
        <Route path="gameover" element={<GameOver />} />
      </Route>
      <Route path="/highscores" element={<HighScores />} />
      <Route path="/topMonsters" element={<TopMonsters />} />
      <Route path="/monster/create" element={<MonsterCreator />} />
      <Route path="/weapon/create" element={<WeaponCreator />} />
      <Route path="/admin">
        <Route path="login" element={<AdminLogin />} />
        <Route path="monsters" element={<MonsterList />} />
      </Route>
    </Routes>
  );
}

export default App;
