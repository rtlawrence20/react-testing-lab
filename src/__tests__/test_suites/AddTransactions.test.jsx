import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AccountContainer from '../../components/AccountContainer';
import '@testing-library/jest-dom/vitest';

// Tests for Add Transaction functionality in AccountContainer
describe('Add Transaction functionality', () => {
    const mockTransactions = [
        { id: 1, date: '2025-10-16', description: 'Coffee', category: 'Food', amount: 5 },
    ];

    it('adds a new transaction via AddTransactionForm', async () => {
        // Step 1: Mock initial GET response
        setFetchResponse(mockTransactions);

        // Step 2: Mock fetch to handle both GET and POST
        const newTransaction = {
            id: 2,
            date: '2025-10-16',
            description: 'Gas',
            category: 'Transport',
            amount: 30,
        };

        global.fetch = vi.fn((url, options) => {
            // POST request
            if (options?.method === 'POST') {
                return Promise.resolve({
                    json: () => Promise.resolve(newTransaction),
                    ok: true,
                    status: 201,
                });
            }
            // GET request
            return Promise.resolve({
                json: () => Promise.resolve(mockTransactions),
                ok: true,
                status: 200,
            });
        });

        // Step 3: Render AccountContainer
        render(<AccountContainer />);

        // Step 4: Query the inputs explicitly by placeholder
        const dateInput = screen.getByPlaceholderText(/Date/i);
        const descriptionInput = screen.getByPlaceholderText(/Description/i);
        const categoryInput = screen.getByPlaceholderText(/Category/i);
        const amountInput = screen.getByPlaceholderText(/Amount/i);
        const form = screen.getByTestId('add-transaction-form');

        // Step 5: Fill out the inputs
        fireEvent.change(dateInput, { target: { value: '2025-10-16' } });
        fireEvent.change(descriptionInput, { target: { value: 'Gas' } });
        fireEvent.change(categoryInput, { target: { value: 'Transport' } });
        fireEvent.change(amountInput, { target: { value: 30 } });

        // Step 6: Submit the form
        fireEvent.submit(form);

        // Step 7: Assert that the new transaction appears
        expect(await screen.findByText('Gas')).toBeInTheDocument();
        expect(screen.getByText('Transport')).toBeInTheDocument();
        expect(screen.getByText('30')).toBeInTheDocument();
    });
});
