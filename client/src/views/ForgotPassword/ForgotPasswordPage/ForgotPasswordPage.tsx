import { FC } from "react";
import { Link, Navigate } from "react-router-dom";
import { Header } from "../../../components/Header/Header";
import { ForgotPasswordForm } from "../ForgotPasswordForm/ForgotPasswordForm";
import {
  CenteredText,
  Container,
  Description,
  Title,
} from "./ForgotPasswordPage.styles";

export const ForgotPasswordPage: FC = () => {
  const isAuthenticated = localStorage.getItem("user") ? true : false;

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <Container>
      <Header />
      <main>
        <section>
          <Title>Forgot your password?</Title>
          <Description>
            Please enter your email to request a password reset link!
          </Description>
          <ForgotPasswordForm />
          <CenteredText>
            Remembered your password? <Link to="/login">Login</Link>
          </CenteredText>
        </section>
      </main>
    </Container>
  );
};
