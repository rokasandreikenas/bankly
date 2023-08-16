import { useQuery } from "@tanstack/react-query";
import { fetchTransactions } from "../api/endpoints/transactions";

const TRANSACTIONS = "TRANSACTIONS";

export const useFetchTransactions = () => {
  return useQuery([TRANSACTIONS], fetchTransactions);
};
