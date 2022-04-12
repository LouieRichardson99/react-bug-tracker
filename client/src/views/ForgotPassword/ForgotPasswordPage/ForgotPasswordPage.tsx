import { FC } from "react";
import { Navigate } from "react-router-dom";
import { ForgotPasswordForm } from "../ForgotPasswordForm/ForgotPasswordForm";

export const ForgotPasswordPage: FC = () => {
  const isAuthenticated = localStorage.getItem("user") ? true : false;

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <ForgotPasswordForm />
    </div>
  );
};
