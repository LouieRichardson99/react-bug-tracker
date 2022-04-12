import { FC, useState } from "react";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField } from "../../../components/forms/TextField/TextField";
import { Spinner } from "../../../icons/Spinner";
import { Link, useNavigate } from "react-router-dom";

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
  const { handleSubmit, register } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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
          setErrorMessage(res.data.message);
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Email Address"
        name="email"
        type="email"
        placeholder="you@example.com"
        register={register}
      />
      <button type="submit">{!loading ? "Reset Password" : <Spinner />}</button>
      <p>
        Back to <Link to="/login">login</Link>
      </p>
      <p>{successMessage}</p>
      <p>{errorMessage}</p>
    </form>
  );
};
