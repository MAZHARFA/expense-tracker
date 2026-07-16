import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Expense from "./pages/Dashboard/Expense";
import Income from "./pages/Dashboard/Income";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Layout from "./components/Layouts/Layout";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import EmailVerificationPage from "./pages/Auth/EmailVerificationPage";
import NewPassword from "./pages/Auth/NewPassword";
import UserProvider from "./context/UserContext";
import UserPage from "./pages/Dashboard/UserPage";


const App = () => {
  return (
    <UserProvider>
      <>
        <Router>
          <Routes>
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/" element={<Layout />} />
            <Route path="/login" exact element={<SignIn />} />
            <Route path="/signup" exact element={<SignUp />} />
            <Route path="/forgot-password" exact element={<ForgotPassword />} />
            <Route path="/new-password/:Token" exact element={<NewPassword />} />
            <Route
              path="/verify-email"
              exact
              element={<EmailVerificationPage />}
            />
            <Route path="/dashboard" exact element={<UserPage />} />
            <Route path="/income" exact element={<Income />} />
            <Route path="/expense" exact element={<Expense />} />
          </Routes>

          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: "white9 ",
                color: "#111827",
                padding: "14px 16px",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: 500,
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                border: "1px solid #e5e7eb",
              },
              success: {
                style: {
                  background: "#ecfdf5", // green-50
                  color: "#065f46", // green-700
                  border: "1px solid #10b981",
                  boxShadow: "0 4px 20px rgba(16, 185, 129, 0.2)",
                },
                iconTheme: {
                  primary: "#10b981",
                  secondary: "#d1fae5",
                },
              },
              error: {
                style: {
                  background: "#fef2f2", // red-50
                  color: "#991b1b", // red-800
                  border: "1px solid #ef4444",
                  boxShadow: "0 4px 20px rgba(239, 68, 68, 0.2)",
                },
                iconTheme: {
                  primary: "#ef4444",
                  secondary: "#fee2e2",
                },
              },
            }}
          />
        </Router>
      </>
    </UserProvider>
  );
};

export default App;

const Root = () => {
  //check token Exist in cookies
  const isAuthenticated = !!cookies.getItem("Token");
  //Redirect Dashboard
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};
