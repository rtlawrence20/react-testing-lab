import React from "react";
import { vi } from "vitest";
import AccountContainer from "../../components/AccountContainer";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

// Mock data for transactions
const mockData = [
    { id: 1, date: "2025-10-01", description: "Lunch", category: "Food", amount: "12.50" },
    { id: 2, date: "2025-10-03", description: "Bus Ticket", category: "Transport", amount: "2.75" },
    { id: 3, date: "2025-10-02", description: "Notebook", category: "Stationery", amount: "5.00" },
];

// Tests for search and sort functionality in AccountContainer
describe("Transaction Search & Sort Functionality", () => {
    beforeEach(() => {
        // Mock fetch to return transactions
        global.fetch = vi.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(mockData),
            })
        );
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    // Test to ensure transactions load correctly
    it("allows the user to select a sort option from the dropdown", async () => {
        render(<AccountContainer />);
        const sortDropdown = screen.getByRole("combobox");

        fireEvent.change(sortDropdown, { target: { value: "category" } });

        await waitFor(() => {
            expect(sortDropdown.value).toBe("category");
        });
    });

    // Test to verify sorting functionality
    it("sorts transactions correctly when a sort option is selected", async () => {
        render(<AccountContainer />);
        const sortDropdown = screen.getByRole("combobox");

        fireEvent.change(sortDropdown, { target: { value: "category" } });

        await waitFor(() => {
            const rows = screen.getAllByRole("row");
            const firstRowText = rows[1].textContent;
            const secondRowText = rows[2].textContent;
            const thirdRowText = rows[3].textContent;

            // Expected alphabetical order by category: Food, Stationery, Transport
            expect(firstRowText).toContain("Lunch");       // Food
            expect(secondRowText).toContain("Notebook");   // Stationery
            expect(thirdRowText).toContain("Bus Ticket");  // Transport
        });
    });

    // Test to verify search functionality
    it("filters transactions as the user types in the search box", async () => {
        render(<AccountContainer />);

        // Wait for initial transactions to render
        await waitFor(() => expect(screen.getByText("Lunch")).toBeInTheDocument());

        // Type into search input
        fireEvent.change(screen.getByPlaceholderText("Search your Recent Transactions"), {
            target: { value: "note" },
        });

        // Verify filtered results
        await waitFor(() => {
            expect(screen.getByText("Notebook")).toBeInTheDocument();
            expect(screen.queryByText("Lunch")).not.toBeInTheDocument();
            expect(screen.queryByText("Bus Ticket")).not.toBeInTheDocument();
        });
    });
});
