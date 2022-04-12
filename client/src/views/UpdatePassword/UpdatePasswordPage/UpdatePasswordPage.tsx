import { FC } from "react";
import { useParams } from "react-router-dom";
import { UpdatePasswordForm } from "../UpdatePasswordForm.tsx/UpdatePasswordForm";

export const UpdatePasswordPage: FC = () => {
  const { token } = useParams();

  return (
    <div>
      <h1>Update Password</h1>
      <UpdatePasswordForm token={token} />
    </div>
  );
};
