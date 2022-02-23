import logo from "./logo.svg";
import "./App.css";
import MonsterCreator from "./Components/MonsterCreator/MonsterCreator";
import { Routes, Route, Navigate, useSearchParams } from "react-router-dom";
import WeaponCreator from "./Components/WeaponCreator/WeaponCreator";

function App() {
  return (
    <Routes>
      <Route
        path="/monster/create"
        element={<MonsterCreator />}
      />
            <Route
        path="/weapon/create"
        element={<WeaponCreator />}
      />
    </Routes>
  );
}

export default App;
