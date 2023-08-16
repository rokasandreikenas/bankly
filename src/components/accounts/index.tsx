import { AccountItem } from "./item";
import { Loading } from "../loading";
import { useFetchAccounts } from "../../hooks/accounts";
import "./index.css";

export const Accounts = () => {
  const { data: accounts, isLoading, isError } = useFetchAccounts();

  return (
    <>
      <h1 className="align-left">Your accounts</h1>
      {isLoading && <Loading />}
      {isError && <div>Error fetching accounts</div>}
      <div className="accounts">
        {accounts?.map((account) => (
          <AccountItem account={account} key={account.account_id} />
        ))}
      </div>
    </>
  );
};
