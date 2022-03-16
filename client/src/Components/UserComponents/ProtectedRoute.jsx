import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
      console.log("redirect")
    return <Navigate to="/signin" replace />;
  } else {
    return (
        <div>
          <Outlet />
        </div>
      );}
};

export default ProtectedRoute;
