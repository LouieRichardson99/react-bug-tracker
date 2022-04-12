import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { TextField } from "../../../components/forms/TextField/TextField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Spinner } from "../../../icons/Spinner";

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
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        "Password must have at least eight characters, one upper case letter, one lower case letter, one number, and one special character"
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
  const [errorMessage, setErrorMessage] = useState(null);

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
          setErrorMessage(res.data.message);
          return;
        }

        setSuccessMessage(res.data.message);

        setTimeout(() => navigate("/login"), 1000);
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="New Password"
        type="password"
        name="password"
        placeholder="•••••••••••••••"
        register={register}
        error={errors.password}
      />
      <TextField
        label="Confirm Password"
        type="password"
        name="repeatPassword"
        register={register}
        error={errors.repeatPassword}
      />
      <button type="submit">
        {!loading ? "Update Password" : <Spinner />}
      </button>
      <p>{successMessage}</p>
      <p>{errorMessage}</p>
    </form>
  );
};
