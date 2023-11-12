import React, { useState } from 'react';
import DataTable from './DataTable';
import FilteringForm from './FilteringForm';
import { useDataLoader } from './DataLoader';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [transactions, setTransactions] = useState([]);

  useDataLoader(searchTerm, setTransactions);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div>
      {/* <UserProfile /> */}
      <FilteringForm onSearchTermChange={term => handleSearch(term)} />
      {/* <DataStatsPanel /> */}
      <DataTable transactions={transactions} />
    </div>
  );
}

export default App;
