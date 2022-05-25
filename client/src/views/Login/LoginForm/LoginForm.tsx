import { FC, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { TextField } from "../../../components/forms/TextField/TextField";
import { PasswordField } from "../../../components/forms/PasswordField/PasswordField";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, Button, Wrapper, ForgotPasswordText } from "./LoginForm.styles";
import { Spinner } from "../../../icons/Spinner";
import { FormValues, ResponseErrorProps } from "../../../types";
import { loginFormSchema as schema } from "../../../schema";
import useAuth from "../../../store/useAuth";
import { setAuth, setPayload } from "../../../utils/auth";
import useUser from "../../../store/useUser";

export const LoginForm: FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });

  const navigate = useNavigate();
  const setAuthState = useAuth((state) => state.setAuth);
  const fetchUser = useUser((state) => state.fetchUser);

  const [loading, setLoading] = useState(false);

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

        setResponseError(null);

        const payload = setPayload(res.data);
        setAuth(payload, setAuthState);
        fetchUser();

        navigate("/");
      })
      .catch((err) => {
        if (err.response.status === 404 || 400) {
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
        placeholder="example@bugzy.com"
        register={register}
        error={errors.email || responseError?.email}
      />
      <PasswordField
        label="Password"
        name="password"
        register={register}
        error={errors.password || responseError?.password}
      />
      <Wrapper>
        <Button aria-label="Sign in" type="submit">
          {!loading ? "Sign in" : <Spinner />}
        </Button>
        <ForgotPasswordText>
          <Link to="/forgot-password">Forgot Password?</Link>
        </ForgotPasswordText>
      </Wrapper>
    </Form>
  );
};
