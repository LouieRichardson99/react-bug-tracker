import { FC } from "react";
import { Link, Navigate } from "react-router-dom";
import { LoginForm } from "../LoginForm/LoginForm";
import { Container, CenteredText, Title } from "./LoginPage.styles";
import { Header } from "../../../components/Header/Header";

export const LoginPage: FC = () => {
  const isAuthenticated = localStorage.getItem("user") ? true : false;

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <Container>
      <Header />
      <main>
        <section>
          <Title>Sign in to Bugzy</Title>
          <LoginForm />
          <CenteredText>
            Not registered yet? <Link to="/signup">Create an Account</Link>
          </CenteredText>
        </section>
      </main>
    </Container>
  );
};
