import create from "zustand";
import { fetchAuth } from "../utils/auth";
import { AuthState, Auth } from "../types";
import { devtools } from "zustand/middleware";

const useAuth = create(
  devtools<AuthState>(
    (set) => ({
      auth: fetchAuth(),
      setAuth: (auth: Auth) => set(() => ({ auth })),
      removeAuth: () => set(() => ({ auth: null })),
    }),
    { name: "Auth Store" }
  )
);

export default useAuth;
