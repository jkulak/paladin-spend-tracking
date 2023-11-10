import React from 'react';
import './FilteringForm.css';

const FilteringForm = () => {
    return (
        <div className="FilteringForm">
            <h2>Filtering Form</h2>
            <label htmlFor="searchInput">Search</label>
            <input type="text" id="searchInput" name="search" />
            <p>Random filtering form placeholder.</p>
        </div>
    );
};

export default FilteringForm;
