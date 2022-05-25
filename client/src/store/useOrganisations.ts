import create from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";
import { OrganisationState } from "../types";

const useOrganisations = create(
  devtools<OrganisationState>(
    () => ({
      organisations: null,
      fetchOrganisations: async () => {
        axios({
          url: "http://localhost:8080/users/organisations",
          method: "GET",
          withCredentials: true,
        }).then(({ data }) => {
          useOrganisations.setState({ organisations: data.organisations });
        });
      },
    }),
    { name: "Organisation Store" }
  )
);

axios({
  url: "http://localhost:8080/users/organisations",
  method: "GET",
  withCredentials: true,
}).then(({ data }) => {
  useOrganisations.setState({ organisations: data.organisations });
});

export default useOrganisations;
