import React from "react";
import AccountContainer from "./AccountContainer";

/**
 * App component serves as the main entry point of the application.
 * It renders the header and the AccountContainer component.
 * 
 * @component
 * @return {JSX.Element} The rendered App component.
 */
function App() {
    return (
        <div className="ui raised segment">
            <div className="ui segment violet inverted">
                <h2>The Royal Bank of Flatiron</h2>
            </div>
            <AccountContainer />
        </div>
    );
}

export default App;
