import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TransactionHistory } from ".";
import { useFetchTransactions } from "../../hooks/transactions";
import { transactions } from "../../api/data/transactions";
import { wrapper } from "../../api/query";
import { formatCurrency } from "../../utils/currency";

describe("transaction history", () => {
  const mockUseFetchTransactions = jest.fn();

  beforeEach(() => {
    (useFetchTransactions as jest.Mock) = mockUseFetchTransactions;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("the expenses tab should be shown by default", async () => {
    mockUseFetchTransactions.mockReturnValue({
      data: transactions,
      isLoading: false,
    });

    render(<TransactionHistory />, { wrapper });

    expect(screen.getByText("Transaction History")).toBeInTheDocument();

    const expensesTabTrigger = screen.getByRole("tab", {
      name: "Expenses",
    });

    expect(expensesTabTrigger).toHaveAttribute("data-state", "active");

    const expensesTable = screen.getByRole("table", {
      name: "Expenses",
    });

    expect(expensesTable).toBeInTheDocument();
    expect(screen.getByText(formatCurrency(-20.25, "EUR"))).toBeInTheDocument();
  });

  test("changing between the expenses and income tabs should show different transactions", async () => {
    render(<TransactionHistory />, { wrapper });

    const expensesTabTrigger = screen.getByRole("tab", {
      name: "Expenses",
    });
    const incomeTabTrigger = screen.getByRole("tab", {
      name: "Income",
    });
    const expensesTable = screen.getByRole("table", {
      name: "Expenses",
    });
    const incomeTable = screen.queryByRole("table", {
      name: "Income",
    });

    expect(expensesTable).toBeInTheDocument();
    expect(incomeTable).not.toBeInTheDocument();

    expect(screen.getByText(formatCurrency(-20.25, "EUR"))).toBeInTheDocument();

    userEvent.click(incomeTabTrigger);

    await waitFor(() => {
      expect(incomeTabTrigger).toHaveAttribute("data-state", "active");
      expect(expensesTabTrigger).toHaveAttribute("data-state", "inactive");

      expect(
        screen.queryByText(formatCurrency(-20.25, "EUR"))
      ).not.toBeInTheDocument();
    });
  });

  test("should display the loading state when data is being fetched", async () => {
    mockUseFetchTransactions.mockReturnValue({
      data: undefined,
      isLoading: true,
    });

    render(<TransactionHistory />, { wrapper });

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("should display an error message when fetching transactions fails", async () => {
    mockUseFetchTransactions.mockReturnValue({
      data: [],
      isLoading: false,
      isError: true,
    });

    render(<TransactionHistory />, { wrapper });

    expect(screen.getByText("Error fetching transactions")).toBeInTheDocument();
  });
});
