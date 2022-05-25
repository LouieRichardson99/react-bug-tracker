import { FC, useEffect } from "react";
import axios from "axios";
import { Sidebar } from "../../../components/Sidebar/Sidebar";
import { SubmitHandler, useForm } from "react-hook-form";
import useUser from "../../../store/useUser";
import useOrganisations from "../../../store/useOrganisations";

type FormValues = {
  image: Blob[];
};

function appendFormData(data: FormValues) {
  const formData = new FormData();

  formData.append("image", data?.image[0]);
  return formData;
}

export const DashboardPage: FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>();

  const user = useUser((state) => state.user);
  const fetchUser = useUser((state) => state.fetchUser);

  const organisations = useOrganisations((state) => state.organisations);

  console.log(organisations);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    axios({
      method: "POST",
      url: "http://localhost:8080/users/upload-profile-image",
      data: appendFormData(data),
      headers: { "content-type": "multipart/form-data" },
      withCredentials: true,
    }).then(() => fetchUser());
  };

  return (
    <div>
      <div>
        <p>{user?.full_name}</p>
        <p>{user?.email}</p>
        <img src={user?.profile_image || undefined} alt="Me!" />
      </div>
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
