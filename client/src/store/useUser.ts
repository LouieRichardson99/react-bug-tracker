import create from "zustand";
import { devtools } from "zustand/middleware";
import { UserState } from "../types";
import axios from "axios";

const useUser = create(
  devtools<UserState>(
    (set) => ({
      user: null,
      removeUser: () => set(() => ({ user: null })),
      fetchUser: async () => {
        axios({
          url: "http://localhost:8080/users/",
          method: "GET",
          withCredentials: true,
        }).then(({ data }) => {
          useUser.setState({ user: data.user });
        });
      },
    }),
    { name: "User Store" }
  )
);

axios({
  url: "http://localhost:8080/users/",
  method: "GET",
  withCredentials: true,
}).then(({ data }) => {
  useUser.setState({ user: data.user });
});

export default useUser;
