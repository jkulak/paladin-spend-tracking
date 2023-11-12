import React, { useState } from 'react';
import DataTable from './DataTable';
import FilteringForm from './FilteringForm';
import { useDataLoader } from './DataLoader';

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
      {/* <UserProfile /> */}
      <FilteringForm onSearchTermChange={term => handleSearch(term)} searchTerm={inputSearchTerm} />
      {/* <DataStatsPanel /> */}
      <DataTable transactions={transactions} onSort={handleSort} onTagClick={handleSearch} />
    </div>
  );
}

export default App;
