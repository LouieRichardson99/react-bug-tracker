import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { PasswordField } from "../../../components/forms/PasswordField/PasswordField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Spinner } from "../../../icons/Spinner";
import {
  Button,
  ErrorText,
  Form,
  SuccessText,
} from "./UpdatePasswordForm.styles";

type Props = {
  token?: string;
};

type FormValues = {
  password?: string;
  repeatPassword?: string;
};

const schema = yup
  .object({
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
        "Password must have at least eight characters, one upper case letter, one lower case letter, and one number"
      ),
    repeatPassword: yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref("password"), null], "Passwords do not match"),
  })
  .required();

export const UpdatePasswordForm: FC<Props> = (props) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const [responseError, setResponseError] = useState(null);
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);

    const axiosData = {
      ...data,
      token: props.token,
    };

    axios({
      method: "PUT",
      url: "http://localhost:8080/users/update-password",
      data: axiosData,
      withCredentials: true,
    })
      .then((res) => {
        if (res.status !== 200) {
          setResponseError(res.data.message);
          return;
        }

        setSuccessMessage(res.data.message);

        setTimeout(() => navigate("/login"), 1000);
      })
      .catch((err) => {
        setResponseError(err.response.data.message);
        throw new Error(err.response.data.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <PasswordField
        label="New Password"
        name="password"
        register={register}
        error={errors.password}
      />
      <PasswordField
        label="Confirm Password"
        name="repeatPassword"
        register={register}
        error={errors.repeatPassword}
        showEye={false}
      />
      {!successMessage && (
        <Button type="submit">
          {!loading ? "Reset Password" : <Spinner />}
        </Button>
      )}
      {successMessage && <SuccessText>{successMessage}</SuccessText>}
      {responseError && <ErrorText>{responseError}</ErrorText>}
    </Form>
  );
};
