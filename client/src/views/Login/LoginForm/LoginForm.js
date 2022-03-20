import axios from "axios";
import { useForm } from "react-hook-form";
import { TextField } from "../../../components/forms/TextField/TextField";

export const LoginForm = () => {
  const { handleSubmit, register } = useForm();

  const onSubmit = (data) => {
    axios({ method: "POST", url: "http://localhost:8080/users/login", data })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        name="email"
        type="email"
        placeholder="you@example.com"
        register={register}
      />
      <TextField
        name="password"
        type="password"
        placeholder="*******"
        register={register}
      />
      <button type="submit">Submit</button>
    </form>
  );
};
