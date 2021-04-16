import { Route, Navigate } from "react-router-dom";
import React from "react"
import { useAuth } from "./Context/AuthProvider";

export function PrivateRoute({ path, ...props }) {
  const { isUserLogin } = useAuth();

  return isUserLogin ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate replace to="/login" />
  );
}