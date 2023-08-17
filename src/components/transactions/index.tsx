import * as Tabs from "@radix-ui/react-tabs";
import { Expenses, Income } from "./table";
import { Loading } from "../loading";
import { useFetchTransactions } from "../../hooks/transactions";
import { Transaction as TransactionType } from "../../../types";
import "./index.css";

const isExpense = (transaction: TransactionType) =>
  transaction.amount.value < 0;
const isIncome = (transaction: TransactionType) => transaction.amount.value > 0;

export const TransactionHistory = () => {
  const { data: transactions, isLoading, isError } = useFetchTransactions();

  return (
    <>
      <h2 className="align-left transaction-heading">Transaction History</h2>
      {isLoading && <Loading />}
      {isError && <div>Error fetching transactions</div>}
      {!isLoading && !isError && (
        <Tabs.Root defaultValue="expenses" className="flow">
          <Tabs.List
            className="tabs__list"
            aria-label="Filter your transactions"
          >
            <Tabs.Trigger value="expenses">Expenses</Tabs.Trigger>
            <Tabs.Trigger value="income">Income</Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content className="TabsContent" value="expenses">
            <Expenses transactions={transactions.filter(isExpense)} />
          </Tabs.Content>
          <Tabs.Content className="TabsContent" value="income">
            <Income transactions={transactions.filter(isIncome)} />
          </Tabs.Content>
        </Tabs.Root>
      )}
    </>
  );
};
