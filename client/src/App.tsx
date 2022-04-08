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

interface RouteProps {
  children?: ReactNode;
}

const AuthenticatedRoute = ({ children }: RouteProps) => {
  const isAuthenticated = localStorage.getItem("user") ? true : false;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Check if session has expired
  const user = JSON.parse(localStorage.getItem("user") || "");

  if (user.expiresAt < new Date().getTime()) {
    localStorage.removeItem("user");

    return <Navigate to="/login" />;
  }

  return <Fragment>{children}</Fragment>;
};

function App() {
  return (
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
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
