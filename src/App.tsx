import React from "react";
import { SignupPage } from "./modules";
import { LoginPage } from "./modules";
import { DashboardPage } from "./modules";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./modules/AppModule/services/AuthContext";
import { PrivateRoute } from "./modules/AppModule/services/PrivateRoute";
import { ScrollToTop } from "./modules/AppModule/ScrollToTop";

const App: React.FC = () => (
  <AuthProvider>
    <ScrollToTop>
      <Routes>
        <Route
          index
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </ScrollToTop>
  </AuthProvider>
);
export default App;
