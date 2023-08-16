import { rest } from "msw";
import { render, screen, waitFor } from "@testing-library/react";
import { Accounts } from ".";
import { server } from "../../../jest.setup";
import { accounts } from "../../api/data/accounts";

describe("Accounts component", () => {
  test("renders accounts when the fetch is successful", async () => {
    render(<Accounts />);

    await waitFor(() => {
      accounts.forEach((account) => {
        expect(
          screen.getByText(account.balance.amount.value.toString())
        ).toBeInTheDocument();
      });
    });
  });

  test("displays loading state during data fetch", async () => {
    server.use(
      rest.get("/api/accounts", (req, res, ctx) => {
        return res(ctx.delay(2000), ctx.json([]));
      })
    );

    render(<Accounts />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("shows error message on fetch failure", async () => {
    server.use(
      rest.get("/api/accounts", (req, res, ctx) => res(ctx.status(500)))
    );

    render(<Accounts />);

    await waitFor(() => {
      expect(screen.getByText("Error fetching accounts")).toBeInTheDocument();
    });
  });
});
