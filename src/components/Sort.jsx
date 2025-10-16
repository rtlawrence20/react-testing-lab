import React from "react";

/**
 * Sort component provides a dropdown to sort transactions.
 * It calls the onSort function passed via props when the selection changes.
 * 
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.onSort - Function to handle sorting.
 * @return {JSX.Element} The rendered Sort component.
 */
function Sort({ onSort }) {
    return (
        <select onChange={(e) => {
            onSort(e.target.value)
        }}>
            <option value={"description"}>Description</option>
            <option value={"category"}>Category</option>
        </select>
    )
}
export default Sort