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
import Signup from "./Components/UserComponents/Signup";
import Signin from "./Components/UserComponents/Signin";
import ProtectedRoute from "./Components/UserComponents/ProtectedRoute";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("currentUser"))
  );
  console.log(user);
  const logout = () => {
    localStorage.removeItem("currentUser");
    setUser(undefined);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <p>Current User: {user?.username}</p>
        <button onClick={logout} style={{height: "40px"}}>Logout</button>
      </div>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin setUser={setUser} />} />
        <Route element={<ProtectedRoute user={user} />}>
          <Route path="/" element={<MainScreen />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/game" element={<Game />}>
            <Route path="battle" element={<BattleScreen user={user} />} />
            <Route path="skills" element={<SkillSelect />} />{" "}
            <Route path="youdied" element={<YouDied />} />
            <Route path="gameover" element={<GameOver />} />
          </Route>
          <Route path="/highscores" element={<HighScores />} />
          <Route path="/topMonsters" element={<TopMonsters />} />
          <Route
            path="/monster/create"
            element={<MonsterCreator user={user} />}
          />
          <Route
            path="/weapon/create"
            element={<WeaponCreator user={user} />}
          />
          <Route path="/admin">
            <Route path="login" element={<AdminLogin />} />
            <Route path="monsters" element={<MonsterList />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
