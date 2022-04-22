import { FC } from "react";
import { Link, Navigate } from "react-router-dom";
import { SignupForm } from "../SignupForm/SignupForm";
import { Container, Title, CenteredText } from "./SignupPage.styles";
import { Header } from "../../../components/Header/Header";

export const SignupPage: FC = () => {
  const isAuthenticated = localStorage.getItem("user") ? true : false;

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <Container>
      <Header />
      <main>
        <section>
          <Title>Register your Organisation</Title>
          <SignupForm />
          <CenteredText>
            Already have an account?<Link to="/login">Sign in</Link>
          </CenteredText>
        </section>
      </main>
    </Container>
  );
};
