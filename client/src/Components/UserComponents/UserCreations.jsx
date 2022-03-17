import React from "react";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const UserCreations = () => {
  return (
    <div>
      <Link to={`/users/monsters`}>
        <button style={{ height: "40px" }}>Monsters</button>
      </Link>{" "}
      <Link to={`/users/weapons`}>
        <button style={{ height: "40px" }}>Weapons</button>
      </Link>
      <Outlet />
    </div>
  );
};

export default UserCreations;
