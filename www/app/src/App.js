import React, { useState } from 'react';
import { useDataLoader } from './DataLoader';
import DataStatsPanel from './DataStatsPanel';
import DataTable from './DataTable';
import FilteringForm from './FilteringForm';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [valueFilter, setValueFilter] = useState('expense');
  const [inputSearchTerm, setInputSearchTerm] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [startDate, setStartDate] = useState(new Date("2023-01-01"));
  const [endDate, setEndDate] = useState(new Date());

  useDataLoader(searchTerm, valueFilter, startDate, endDate, setTransactions, sortColumn, sortDirection);

  const totalValue = Math.floor(transactions.reduce((total, transaction) => total + transaction.value, 0));

  const handleSort = (column, direction) => {
    setSortColumn(column);
    setSortDirection(direction);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setInputSearchTerm(term);
  };

  const handleValueFilter = (filter) => {
    setValueFilter(filter);
  };

  return (
    <div>
        <div className="container">
            <h1>Pocket expense browser</h1>
            {/* <UserProfile /> */}
            <FilteringForm onSearchTermChange={term => handleSearch(term)} onValueFilterChange={filter => handleValueFilter(filter)} onStartDateChange={date => setStartDate(date)} onEndDateChange={date => setEndDate(date)} searchTerm={inputSearchTerm} />
            <DataStatsPanel totalValue={totalValue} />
            <DataTable transactions={transactions} onSort={handleSort} onTagClick={handleSearch} />
        </div>
    </div>
  );
}

export default App;
