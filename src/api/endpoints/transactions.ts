import axios from "axios";
import { Transaction } from "../../../types";

export const fetchTransactions = async (): Promise<Transaction[]> => {
  const response = await axios.get("/api/transactions");
  return response.data;
};
