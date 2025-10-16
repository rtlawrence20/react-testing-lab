import React from "react";
import Transaction from "./Transaction";

/**
 * TransactionsList component displays a list of transactions in a table format.
 * It maps over the transactions prop to render individual Transaction components.
 * 
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.transactions - Array of transaction objects to display.
 * @return {JSX.Element} The rendered TransactionsList component.
 */
function TransactionsList({ transactions }) {
    const transactionComponent = transactions.map((transaction) => {
        return <Transaction key={transaction.id} transaction={transaction} />
    })
    return (
        <table className="ui celled striped padded table">
            <tbody>
                <tr>
                    <th>
                        <h3 className="ui center aligned header">Date</h3>
                    </th>
                    <th>
                        <h3 className="ui center aligned header">Description</h3>
                    </th>
                    <th>
                        <h3 className="ui center aligned header">Category</h3>
                    </th>
                    <th>
                        <h3 className="ui center aligned header">Amount</h3>
                    </th>
                    <th>
                        <h3 className="ui center aligned header">DELETE</h3>
                    </th>
                </tr>
                {transactionComponent}
            </tbody>
        </table>
    );
}

export default TransactionsList;
