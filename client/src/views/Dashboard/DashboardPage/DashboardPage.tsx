import { FC } from "react";
import axios from "axios";
import { Sidebar } from "../../../components/Sidebar/Sidebar";

import { SubmitHandler, useForm } from "react-hook-form";

type FormValues = {
  image: Array<Blob>;
};

export const DashboardPage: FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const formData = new FormData();

    formData.append("image", data?.image[0]);

    axios({
      method: "POST",
      url: "http://localhost:8080/users/upload-profile-image",
      data: formData,
      headers: { "content-type": "multipart/form-data" },
      withCredentials: true,
    });
  };

  return (
    <div>
      <Sidebar />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("image")}
          type={"file"}
          aria-label="Profile image uploader"
          accept=".jpg, .jpeg, .png"
        />
        <button>Submit</button>
      </form>
    </div>
  );
};
