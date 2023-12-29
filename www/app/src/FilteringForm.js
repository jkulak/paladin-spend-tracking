import React, { useState } from 'react';
import './FilteringForm.css';

const FilteringForm = ({ onSearchTermChange, searchTerm }) => {
    const [expenseChecked, setExpenseChecked] = useState(true);
    const [incomeChecked, setIncomeChecked] = useState(false);

    const handleSearchChange = (event) => {
        const term = event.target.value;
        onSearchTermChange(term);
    };

    const handleExpenseCheckChange = (event) => {
        setExpenseChecked(event.target.checked);
        onSearchTermChange(searchTerm);
    };

    const handleIncomeCheckChange = (event) => {
        setIncomeChecked(event.target.checked);
        onSearchTermChange(searchTerm);
    };

    return (
        <div className="FilteringForm">
            {/* <h2>Filtering Form</h2> */}
            <label htmlFor="searchInput">Search</label>
            <input type="text" id="searchInput" name="search" value={searchTerm} onChange={handleSearchChange} />
            <div>
                <input type="checkbox" id="expenseCheckbox" name="expenseCheckbox" checked={expenseChecked} onChange={handleExpenseCheckChange} />
                <label htmlFor="expenseCheckbox">Expense</label>
            </div>
            <div>
                <input type="checkbox" id="incomeCheckbox" name="incomeCheckbox" checked={incomeChecked} onChange={handleIncomeCheckChange} />
                <label htmlFor="incomeCheckbox">Income</label>
            </div>
            <p>Random filtering form placeholder.</p>
        </div>
    );
};

export default FilteringForm;
