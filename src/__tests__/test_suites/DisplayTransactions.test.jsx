import { render, screen, waitFor } from "@testing-library/react";
import AccountContainer from "../../components/AccountContainer";
import { describe, test, expect, vi } from "vitest";

// Mock fetch
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        { id: 1, date: "2024-10-01", description: "Groceries", category: "Food", amount: 50 },
        { id: 2, date: "2024-10-02", description: "Gas", category: "Transport", amount: 30 },
      ]),
  })
);

describe("Display Transactions", () => {
  test("shows transactions on startup", async () => {
    render(<AccountContainer />);
    await waitFor(() => {
      expect(screen.getByText(/Groceries/i)).toBeInTheDocument();
      expect(screen.getByText(/Gas/i)).toBeInTheDocument();
    });
  });
});
