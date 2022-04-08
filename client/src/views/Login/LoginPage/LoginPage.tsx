import { FC } from "react";
import { Link, Navigate } from "react-router-dom";
import { LoginForm } from "../LoginForm/LoginForm";
import { Container, NoAccountText, Title } from "./LoginPage.styles";

export const LoginPage: FC = () => {
  const isAuthenticated = localStorage.getItem("user") ? true : false;

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <Container>
      <section>
        <Title>Sign in to Bugzy</Title>
        <LoginForm />
        <NoAccountText>
          Not registered yet? <Link to="/signup">Create an Account</Link>
        </NoAccountText>
      </section>
    </Container>
  );
};
