import axios from "axios";
import { FC } from "react";

export const DashboardPage: FC = () => {
  // TODO: Setup a useEffect hook to fetch required data for dashboard

  axios({
    method: "GET",
    url: "http://localhost:8080",
    withCredentials: true,
  }).then((res) => console.log(res));

  return <div>Dashboard</div>;
};
