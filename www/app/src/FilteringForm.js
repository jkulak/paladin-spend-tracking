import React, { useState } from 'react';
import './FilteringForm.css';

const FilteringForm = ({ onSearchTermChange, onValueFilterChange, searchTerm }) => {
    const [valueFilter, setValueFilter] = useState('expense');

    const handleSearchChange = (event) => {
        const term = event.target.value;
        onSearchTermChange(term);
    };

    const handleValueFilterChange = (event) => {
        setValueFilter(event.target.value);
        onValueFilterChange(event.target.value);
    };

    return (
        <div className="FilteringForm">
            <label htmlFor="searchInput">Search</label>
            <input type="text" id="searchInput" name="search" value={searchTerm} onChange={handleSearchChange} />
            <div>
                <button className={`button ${valueFilter === 'income' ? 'button-outline' : ''}`} name="valueFilter" value="expense" id="expense" onClick={handleValueFilterChange}>Expense</button>
                {/* <input type="radio" id="expense" name="valueFilter" value="expense" checked={valueFilter === 'expense'} onChange={handleValueFilterChange} /> */}
                {/* <label htmlFor="expense">Expense</label> */}

                <button className={`button ${valueFilter === 'expense' ? 'button-outline' : ''}`} name="valueFilter" value="income" id="income" onClick={handleValueFilterChange}>Income</button>
                {/* <input type="radio" id="income" name="valueFilter" value="income" checked={valueFilter === 'income'} onChange={handleValueFilterChange} /> */}
                {/* <label htmlFor="income">Income</label> */}
            </div>
        </div>
    );
};

export default FilteringForm;
