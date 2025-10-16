import React from "react";

/**
 * Search component provides a search input to filter transactions.
 * It calls the setSearch function passed via props on input change.
 * 
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.setSearch - Function to update the search term.
 * @return {JSX.Element} The rendered Search component.
 */
function Search({ setSearch }) {
    return (
        <div className="ui large fluid icon input">
            <input
                type="text"
                placeholder="Search your Recent Transactions"
                onChange={(e) => setSearch(e.target.value)}
            />
            <i className="circular search link icon"></i>
        </div>
    );
}

export default Search;
