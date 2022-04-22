import { FC } from "react";
import { Link, useParams } from "react-router-dom";
import { Header } from "../../../components/Header/Header";
import { UpdatePasswordForm } from "../UpdatePasswordForm.tsx/UpdatePasswordForm";
import { Container, Title, CenteredText } from "./UpdatePasswordPage.styles";

export const UpdatePasswordPage: FC = () => {
  const { token } = useParams();

  return (
    <Container>
      <Header />
      <main>
        <section>
          <Title>Reset your Password</Title>
          <UpdatePasswordForm token={token} />
          <CenteredText>
            Back to <Link to="/login">Login</Link>
          </CenteredText>
        </section>
      </main>
    </Container>
  );
};
