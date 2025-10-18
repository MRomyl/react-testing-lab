import { render, screen, fireEvent } from "@testing-library/react";
import AccountContainer from "../../components/AccountContainer";
import { describe, test, expect, vi } from "vitest";

global.fetch = vi.fn((url, options) => {
  if (options?.method === "POST") {
    return Promise.resolve({
      json: () =>
        Promise.resolve({
          id: 3,
          date: "2024-10-03",
          description: "Coffee",
          category: "Food",
          amount: 5,
        }),
    });
  }
  // GET request
  return Promise.resolve({
    json: () =>
      Promise.resolve([
        { id: 1, date: "2024-10-01", description: "Groceries", category: "Food", amount: 50 },
      ]),
  });
});

describe("Add Transactions", () => {
  test("adds new transaction to frontend and calls POST request", async () => {
    render(<AccountContainer />);

    const descriptionInput = screen.getByPlaceholderText(/description/i);
    const amountInput = screen.getByPlaceholderText(/amount/i);
    const categoryInput = screen.getByPlaceholderText(/category/i);
    const addButton = screen.getByText(/add transaction/i);

    fireEvent.change(descriptionInput, { target: { value: "Coffee" } });
    fireEvent.change(amountInput, { target: { value: "5" } });
    fireEvent.change(categoryInput, { target: { value: "Food" } });
    fireEvent.click(addButton);

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/transactions"),
      expect.objectContaining({ method: "POST" })
    );

    const newTransaction = await screen.findByText(/coffee/i);
    expect(newTransaction).toBeInTheDocument();
  });
});
