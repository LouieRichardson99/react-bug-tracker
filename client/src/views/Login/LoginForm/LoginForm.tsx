import { FC, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { TextField } from "../../../components/forms/TextField/TextField";
import { AuthContext } from "../../../context/AuthContext";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form, Button } from "./LoginForm.styles";
import { Spinner } from "../../../icons/Spinner";

type FormValues = {
  email: string;
  password: string;
};

const schema = yup
  .object({
    email: yup
      .string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

export const LoginForm: FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  interface ResponseErrorProps {
    email?: { message: string };
    password?: { message: string };
  }

  const [responseError, setResponseError] = useState<ResponseErrorProps | null>(
    null
  );

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setLoading(true);

    axios({
      method: "POST",
      url: "http://localhost:8080/users/login",
      data,
      withCredentials: true,
    })
      .then((res) => {
        if (res.status !== 200) return;

        const payload = {
          id: res.data.user.id,
          email: res.data.user.email,
          expiresAt: new Date().getTime() + 100000,
        };

        authContext.setAuthState({
          type: "setAuth",
          payload,
        });

        localStorage.setItem("user", JSON.stringify(payload));

        setResponseError(null);
        // Will automatically take user to dashboard
        navigate("/");
      })
      .catch((err) => {
        if (err.response.status === 404) {
          setResponseError({ email: { message: err.response.data.message } });
        }

        if (err.response.status === 401) {
          setResponseError({
            password: { message: err.response.data.message },
          });
        }

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
        placeholder="you@example.com"
        register={register}
        error={errors.email || responseError?.email}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        placeholder="•••••••••••••••"
        register={register}
        error={errors.password || responseError?.password}
      />
      <Button aria-label="Sign in" type="submit">
        {!loading ? "Sign in" : <Spinner />}
      </Button>
    </Form>
  );
};
