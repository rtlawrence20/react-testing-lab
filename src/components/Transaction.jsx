import React from "react";

/**
 * Transaction component represents a single transaction row in a table.
 * It displays the transaction's date, description, category, and amount.
 * 
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.transaction - The transaction data to display.
 * @return {JSX.Element} The rendered Transaction component.
 */
function Transaction({ transaction }) {
    return (
        <tr data-testid={`transaction-${transaction.id}`}>
            <td>{transaction.date}</td>
            <td className="description">{transaction.description}</td>
            <td className="category">{transaction.category}</td>
            <td className="amount">{transaction.amount}</td>
        </tr>
    );
}

export default Transaction;
