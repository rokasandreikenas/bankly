import { useEffect, useState } from "react";
import { AccountItem } from "./item";
import { Loading } from "../loading";
import { Account } from "../../../types";
import "./index.css";

export const Accounts = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetch("/api/accounts")
      .then((resp) => resp.json())
      .then((response: Account[]) => {
        setAccounts(response);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  }, []);

  return (
    <>
      <h1 className="align-left">Your accounts</h1>
      {isLoading && <Loading />}
      {isError && <div>Error fetching accounts</div>}
      {!isLoading && !isError && (
        <div className="accounts">
          {accounts.map((account) => (
            <AccountItem account={account} key={account.account_id} />
          ))}
        </div>
      )}
    </>
  );
};
