import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from '../components/App';
import '@testing-library/jest-dom/vitest';

// Mock AccountContainer so its internal components aren't rendered
vi.mock('../components/AccountContainer', () => ({
    default: () => <div data-testid="account-container-mock" />,
}));

// Basic test to ensure App component renders without crashing
describe('App basic load', () => {
    it('renders the header', () => {
        render(<App />);
        expect(screen.getByText(/The Royal Bank of Flatiron/i)).toBeInTheDocument();
    });

    it('renders AccountContainer component', () => {
        render(<App />);
        expect(screen.getByTestId('account-container-mock')).toBeInTheDocument();
    });
});
