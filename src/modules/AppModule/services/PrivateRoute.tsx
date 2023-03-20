import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

interface Props {
  children: JSX.Element;
}

export const PrivateRoute = ({ children }: Props) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
};
