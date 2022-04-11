import { FC, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField } from "../../../components/forms/TextField/TextField";
import { AuthContext } from "../../../context/AuthContext";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form, Button } from "./SignupForm.styles";
import { Spinner } from "../../../icons/Spinner";

type FormValues = {
  fullName?: string;
  email: string;
  organisationName?: string;
  password: string;
  repeatPassword?: string;
};

const schema = yup
  .object({
    fullName: yup.string().required("Full name is required"),
    email: yup
      .string()
      .email("Must be a valid email address")
      .required("Email is required"),
    organisationName: yup.string().required("Organisation name is required"),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        "Password must have at least eight characters, one upper case letter, one lower case letter, one number, and one special character"
      ),
    repeatPassword: yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref("password"), null], "Passwords do not match"),
  })
  .required();

export const SignupForm: FC = () => {
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
  }

  const [responseError, setResponseError] = useState<ResponseErrorProps | null>(
    null
  );

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

        const hour = 3600000;

        const payload = {
          id: res.data.user.id,
          email: res.data.user.email,
          expiresAt: new Date().getTime() + hour,
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
        if (err.response.status === 409) {
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
        placeholder="you@example.com"
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
      <TextField
        label="Password"
        name="password"
        type="password"
        placeholder="•••••••••••••••"
        register={register}
        error={errors.password}
      />
      <TextField
        label="Confirm Password"
        name="repeatPassword"
        type="password"
        register={register}
        error={errors.repeatPassword}
      />
      <Button aria-label="register" type="submit">
        {!loading ? "Register" : <Spinner />}
      </Button>
    </Form>
  );
};
