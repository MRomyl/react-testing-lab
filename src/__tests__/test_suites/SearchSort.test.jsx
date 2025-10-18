import { render, screen, fireEvent } from "@testing-library/react";
import TransactionsList from "../../components/TransactionsList";
import { describe, test, expect } from "vitest";

describe("Search & Sort Transactions", () => {
  const mockTransactions = [
    { id: 1, date: "2024-01-01", description: "Coffee", category: "Food", amount: 5 },
    { id: 2, date: "2024-01-02", description: "Groceries", category: "Food", amount: 50 },
  ];

  test("updates page when search input changes", async () => {
    render(<TransactionsList transactions={mockTransactions} />);

    const searchInput = screen.getByPlaceholderText(/search/i);
    fireEvent.change(searchInput, { target: { value: "coffee" } });

    const result = await screen.findByText(/coffee/i);
    expect(result).toBeInTheDocument();
  });
});
