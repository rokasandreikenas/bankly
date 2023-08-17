import type { Account } from "../../../types";
import { formatCurrency } from "../../utils/currency";
import "./index.css";

type Props = {
  account: Account;
};

export const AccountItem = ({ account }: Props) => {
  return (
    <div className="account">
      <div className="total">Total {account.balance.amount.currency}</div>
      <strong className="value">
        {formatCurrency(
          account.balance.amount.value,
          account.balance.amount.currency
        )}
      </strong>
    </div>
  );
};
