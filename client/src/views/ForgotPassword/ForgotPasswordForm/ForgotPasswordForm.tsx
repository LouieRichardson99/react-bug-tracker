import { FC, useState } from "react";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField } from "../../../components/forms/TextField/TextField";
import { Spinner } from "../../../icons/Spinner";
import { useNavigate } from "react-router-dom";
import { Button, Form, SuccessText } from "./ForgotPasswordForm.styles";

type FormValues = {
  email?: string;
};

const schema = yup
  .object({
    email: yup
      .string()
      .email("Must be a valid email address")
      .required("Email is required"),
  })
  .required();

export const ForgotPasswordForm: FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  interface ResponseErrorProps {
    email?: { message: string };
  }

  const [successMessage, setSuccessMessage] = useState(null);
  const [responseError, setResponseError] = useState<ResponseErrorProps | null>(
    null
  );

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setLoading(true);

    axios({
      method: "POST",
      url: "http://localhost:8080/users/reset-password",
      data,
      withCredentials: true,
    })
      .then((res) => {
        if (res.status !== 200) {
          setResponseError({ email: { message: res.data.message } });
          return;
        }

        setSuccessMessage(res.data.message);

        setTimeout(() => navigate("/login"), 2000);
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Email Address"
        name="email"
        type="email"
        placeholder="example@bugzy.com"
        register={register}
        error={errors.email || responseError?.email}
      />
      {!successMessage && (
        <Button type="submit">
          {!loading ? "Send Reset Link" : <Spinner />}
        </Button>
      )}
      {successMessage && <SuccessText>{successMessage}</SuccessText>}
    </Form>
  );
};
