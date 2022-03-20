import axios from "axios";
import { useEffect } from "react";

export const IndexPage = () => {
  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:8080/users/logout",
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  });

  return <div></div>;
};
