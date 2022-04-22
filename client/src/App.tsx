import { Fragment, ReactNode } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { LoginPage } from "./views/Login/LoginPage/LoginPage";
import { SignupPage } from "./views/Signup/SignupPage/SignupPage";
import { AuthProvider } from "./context/AuthContext";
import { DashboardPage } from "./views/Dashboard/DashboardPage/DashboardPage";
import "./index.css";
import { ForgotPasswordPage } from "./views/ForgotPassword/ForgotPasswordPage/ForgotPasswordPage";
import { UpdatePasswordPage } from "./views/UpdatePassword/UpdatePasswordPage/UpdatePasswordPage";
import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    green: "hsl(106, 32%, 56%)",
    red: "hsl(0, 58%, 58%)",
    body: "hsl(0, 0%, 18%)",
  },
};

interface RouteProps {
  children?: ReactNode;
}

const AuthenticatedRoute = ({ children }: RouteProps) => {
  const isAuthenticated = localStorage.getItem("user") ? true : false;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const user = JSON.parse(localStorage.getItem("user") || "");

  // Check if session has expired
  if (user.expiresAt < new Date().getTime()) {
    localStorage.removeItem("user");

    return <Navigate to="/login" />;
  }

  return <Fragment>{children}</Fragment>;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <AuthenticatedRoute>
                  <DashboardPage />
                </AuthenticatedRoute>
              }
            />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route
              path="/update-password/:token"
              element={<UpdatePasswordPage />}
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
