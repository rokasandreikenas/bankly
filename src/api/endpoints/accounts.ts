import axios from "axios";
import { Account } from "../../../types";

export const fetchAccounts = async (): Promise<Account[]> => {
  const response = await axios.get("/api/accounts");
  return response.data;
};
