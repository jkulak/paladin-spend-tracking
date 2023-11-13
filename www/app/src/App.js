import React, { useState } from 'react';
import { useDataLoader } from './DataLoader';
import DataStatsPanel from './DataStatsPanel';
import DataTable from './DataTable';
import FilteringForm from './FilteringForm';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [inputSearchTerm, setInputSearchTerm] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  useDataLoader(searchTerm, setTransactions, sortColumn, sortDirection);

  const handleSort = (column, direction) => {
    setSortColumn(column);
    setSortDirection(direction);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setInputSearchTerm(term);
  };

  return (
    <div>
        <div className="container">
            <h1>Pocket expense browser</h1>
            {/* <UserProfile /> */}
            <FilteringForm onSearchTermChange={term => handleSearch(term)} searchTerm={inputSearchTerm} />
            <DataStatsPanel />
            <DataTable transactions={transactions} onSort={handleSort} onTagClick={handleSearch} />
        </div>
    </div>
  );
}

export default App;
