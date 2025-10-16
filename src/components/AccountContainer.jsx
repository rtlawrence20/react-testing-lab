import React, { useState, useEffect } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";
import Sort from "./Sort";

/**
 * AccountContainer component manages the state and logic for transactions,
 * including fetching, adding, searching, and sorting transactions.
 * It renders child components for displaying and interacting with transactions.
 * 
 * @component
 * @return {JSX.Element} The rendered AccountContainer component.
 */
function AccountContainer() {
    const [transactions, setTransactions] = useState([]);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("description"); // track selected sort

    useEffect(() => {
        fetch("http://localhost:6001/transactions")
            .then(r => r.json())
            .then(data => setTransactions(data));
    }, []);

    function postTransaction(newTransaction) {
        fetch("http://localhost:6001/transactions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTransaction)
        })
            .then(r => r.json())
            .then(data => setTransactions([...transactions, data]));
    }

    // Sort handler
    function onSort(field) {
        setSortBy(field);
    }

    // Apply search filter and sorting
    const displayedTransactions = transactions
        .filter(tx =>
            tx.description.toLowerCase().includes(search.toLowerCase()) ||
            tx.category.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => {
            if (a[sortBy].toLowerCase() < b[sortBy].toLowerCase()) return -1;
            if (a[sortBy].toLowerCase() > b[sortBy].toLowerCase()) return 1;
            return 0;
        });

    return (
        <div>
            <Search setSearch={setSearch} />
            <AddTransactionForm postTransaction={postTransaction} />
            <Sort onSort={onSort} />
            <TransactionsList transactions={displayedTransactions} />
        </div>
    );
}

export default AccountContainer;