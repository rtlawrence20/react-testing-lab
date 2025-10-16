import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AccountContainer from '../../components/AccountContainer';
import '@testing-library/jest-dom/vitest';

// Tests for display transactions functionality in AccountContainer
describe('Display Transactions functionality', () => {
    const mockTransactions = [
        { id: 1, date: '2025-10-16', description: 'Coffee', category: 'Food', amount: 5 },
        { id: 2, date: '2025-10-17', description: 'Gas', category: 'Transport', amount: 30 },
    ];

    it('fetches and displays transactions on mount', async () => {
        // Mock GET request
        setFetchResponse(mockTransactions);

        // Render AccountContainer
        render(<AccountContainer />);

        // Assert that the transactions appear
        expect(await screen.findByText('Coffee')).toBeInTheDocument();
        expect(screen.getByText('Food')).toBeInTheDocument();
        expect(screen.getByText('5')).toBeInTheDocument();
        expect(screen.getByText('Gas')).toBeInTheDocument();
        expect(screen.getByText('Transport')).toBeInTheDocument();
        expect(screen.getByText('30')).toBeInTheDocument();
    });
});
