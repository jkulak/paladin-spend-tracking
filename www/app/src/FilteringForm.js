import React, { useState } from 'react';
import './FilteringForm.css';

const FilteringForm = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        onSearch(term);
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
