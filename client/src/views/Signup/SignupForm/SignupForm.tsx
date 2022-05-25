import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField } from "../../../components/forms/TextField/TextField";
import { PasswordField } from "../../../components/forms/PasswordField/PasswordField";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, Button } from "./SignupForm.styles";
import { Spinner } from "../../../icons/Spinner";
import useAuth from "../../../store/useAuth";
import {
  FormValues,
  OnChangeErrorProps,
  ResponseErrorProps,
} from "../../../types";
import { setPayload, setAuth } from "../../../utils/auth";
import { signupFormSchema as schema } from "../../../schema";
import useUser from "../../../store/useUser";

export const SignupForm: FC = () => {
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

  const [onChangeError, setOnChangeError] = useState<OnChangeErrorProps | null>(
    null
  );

  function handlePasswordStrength(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value === "") {
      return setOnChangeError(null);
    }

    const valid = e.target.value.match(
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$"
    )
      ? true
      : false;

    if (!valid) {
      return setOnChangeError({
        password: {
          message:
            "Password must have at least eight characters, one upper case letter, one lower case letter, and one number",
        },
      });
    }

    return setOnChangeError(null);
  }

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setLoading(true);

    axios({
      method: "POST",
      url: "http://localhost:8080/users/signup",
      data,
      withCredentials: true,
    })
      .then((res) => {
        if (res.status !== 201) return;

        setResponseError(null);

        const payload = setPayload(res.data);
        setAuth(payload, setAuthState);
        fetchUser();

        navigate("/");
      })
      .catch((err) => {
        if (err.response.status === 409 || 400) {
          setResponseError({ email: { message: err.response.data.message } });
        }

        throw new Error(err.response.data.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Full Name"
        name="fullName"
        type="text"
        placeholder="John Doe"
        register={register}
        error={errors.fullName}
      />
      <TextField
        label="Email Address"
        name="email"
        type="email"
        placeholder="example@bugzy.com"
        register={register}
        error={errors.email || responseError?.email}
      />
      <TextField
        label="Organisation Name"
        name="organisationName"
        type="text"
        placeholder="Google"
        register={register}
        error={errors.organisationName}
      />
      <PasswordField
        label="Password"
        name="password"
        onChange={handlePasswordStrength}
        register={register}
        error={onChangeError?.password || errors.password}
      />
      <Button aria-label="register" type="submit">
        {!loading ? "Register" : <Spinner />}
      </Button>
    </Form>
  );
};
