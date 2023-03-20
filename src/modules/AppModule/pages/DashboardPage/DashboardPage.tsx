import React from "react";
import "./DashboardPage.scss";
import { useAuth } from "../../services/AuthContext";
import { Button } from "@/global-components";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const DashboardPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { currentUser, logout } = useAuth();
  const navigation = useNavigate();

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
      navigation("/login");
      setIsLoading(false);
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        alert(err.message);
      }
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-container__greetings">Dzień Dobry</h1>
      <h2 className="user-email">{currentUser?.email}</h2>
      <Button
        text="Log Out"
        className="button button--logout"
        disabled={isLoading}
        onClick={handleLogout}
      />
    </div>
  );
};
