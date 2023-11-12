import React, { useState } from 'react';
import './FilteringForm.css';

const FilteringForm = ({ onSearchTermChange, searchTerm }) => {
    const handleSearchChange = (event) => {
        const term = event.target.value;
        onSearchTermChange(term);
    };
    return (
        <div className="FilteringForm">
            <h2>Filtering Form</h2>
            <label htmlFor="searchInput">Search</label>
            <input type="text" id="searchInput" name="search" value={searchTerm} onChange={handleSearchChange} />
            <p>Random filtering form placeholder.</p>
        </div>
    );
};

export default FilteringForm;
