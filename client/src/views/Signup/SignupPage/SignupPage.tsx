import { FC } from "react";
import { Link, Navigate } from "react-router-dom";
import { SignupForm } from "../SignupForm/SignupForm";
import { Container, Title, ExistingAccountText } from "./SignupPage.styles";

export const SignupPage: FC = () => {
  const isAuthenticated = localStorage.getItem("user") ? true : false;

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <Container>
      <section>
        <Title>Register your Organisation</Title>
        <SignupForm />
        <ExistingAccountText>
          Already have an account?<Link to="/login">Sign in</Link>
        </ExistingAccountText>
      </section>
    </Container>
  );
};
