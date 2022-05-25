import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "./SignoutButton.styles";
import { LogoutIcon } from "@heroicons/react/outline";
import useAuth from "../../store/useAuth";

export const SignoutButton = () => {
  const navigate = useNavigate();
  const setAuth = useAuth((state) => state.removeAuth);

  const handleSignOut = () => {
    axios({
      method: "GET",
      url: "http://localhost:8080/users/logout",
      withCredentials: true,
    }).then(() => {
      setAuth();
      localStorage.removeItem("user");
      navigate("/login");
    });
  };

  return (
    <Button onClick={() => handleSignOut()}>
      <LogoutIcon />
      Sign out
    </Button>
  );
};
