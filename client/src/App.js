import logo from "./logo.svg";
import "./App.css";
import MonsterCreator from "./Components/MonsterCreator/MonsterCreator";
import { Routes, Route, Navigate, useSearchParams } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<MonsterCreator />}
      />
    </Routes>
  );
}

export default App;
