import logo from "./logo.svg";
import "./App.css";
import MonsterCreator from "./Components/MonsterCreator/MonsterCreator";
import { Routes, Route, Navigate, useSearchParams } from "react-router-dom";
import WeaponCreator from "./Components/WeaponCreator/WeaponCreator";
import MainScreen from "./Components/MainScreens/MainMenu";
import BattleScreen from "./Components/MainScreens/BattleScreen";
import SkillSelect from "./Components/MainScreens/SkillSelect";
import Game from "./Components/MainScreens/Game";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainScreen />} />
      <Route path="/game" element={<Game />}>
        <Route path="battle" element={<BattleScreen />} />
        <Route path="skills" element={<SkillSelect />} />
      </Route>
      <Route path="/monster/create" element={<MonsterCreator />} />
      <Route path="/weapon/create" element={<WeaponCreator />} />
    </Routes>
  );
}

export default App;
