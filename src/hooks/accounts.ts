import { useQuery } from "@tanstack/react-query";
import { fetchAccounts } from "../api/endpoints/accounts";

const ACCOUNTS = "ACCOUNTS";

export const useFetchAccounts = () => {
  return useQuery([ACCOUNTS], fetchAccounts);
};
