import { Accounts } from "../../components/accounts";
import { TransactionHistory } from "../../components/transactions";
import "./index.css";

export const Home = () => (
  <main className="main-content">
    <Accounts />
    <TransactionHistory />
  </main>
);
