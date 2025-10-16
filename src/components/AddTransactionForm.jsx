import React from "react";

/**
 * AddTransactionForm component provides a form to add new transactions.
 * It captures user input and calls the postTransaction function passed via props.
 * 
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.postTransaction - Function to post a new transaction.
 * @return {JSX.Element} The rendered AddTransactionForm component.
 */
function AddTransactionForm({ postTransaction }) {
    function submitForm(e) {
        e.preventDefault();

        // Use FormData instead of accessing e.target.date/etc
        const formData = new FormData(e.target);
        const newTransaction = {
            date: formData.get("date"),
            description: formData.get("description"),
            category: formData.get("category"),
            amount: parseFloat(formData.get("amount")),
        };

        postTransaction(newTransaction);

        // Optional: reset form after submit
        e.target.reset();
    }

    return (
        <div className="ui segment">
            <form
                className="ui form"
                data-testid="add-transaction-form"
                onSubmit={submitForm}
            >
                <div className="inline fields">
                    <input type="date" name="date" placeholder="Date" />
                    <input type="text" name="description" placeholder="Description" />
                    <input type="text" name="category" placeholder="Category" />
                    <input
                        type="number"
                        name="amount"
                        placeholder="Amount"
                        step="0.01"
                    />
                </div>
                <button className="ui button" type="submit">
                    Add Transaction
                </button>
            </form>
        </div>
    );
}

export default AddTransactionForm;
