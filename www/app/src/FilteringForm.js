import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './FilteringForm.css';

const FilteringForm = ({ onSearchTermChange, onValueFilterChange, onStartDateChange, onEndDateChange, searchTerm }) => {
    const [valueFilter, setValueFilter] = useState('expense');
    const [startDate, setStartDate] = useState(new Date("2023-01-01"));
    const [endDate, setEndDate] = useState(new Date());

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
                <label htmlFor="startDate">From:</label>
                <DatePicker selected={startDate} onChange={(date) => { setStartDate(date); onStartDateChange(date); }} />
            </div>
            <div>
                <label htmlFor="endDate">To:</label>
                <DatePicker selected={endDate} onChange={(date) => { setEndDate(date); onEndDateChange(date); }} />
            </div>
            <div>
                <button className={`button ${valueFilter === 'income' ? 'button-outline' : ''}`} name="valueFilter" value="expense" id="expense" onClick={handleValueFilterChange}>Expense</button>
                <button className={`button ${valueFilter === 'expense' ? 'button-outline' : ''}`} name="valueFilter" value="income" id="income" onClick={handleValueFilterChange}>Income</button>
            </div>
        </div>
    );
};

export default FilteringForm;
