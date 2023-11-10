import React, { useState } from 'react';
import DataStatsPanel from './DataStatsPanel';
import DataTable from './DataTable';
import FilteringForm from './FilteringForm';
import UserProfile from './UserProfile';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div>
      <UserProfile />
      <FilteringForm onSearch={handleSearch} />
      <DataStatsPanel />
      <DataTable searchTerm={searchTerm} />
    </div>
  );
}

export default App;
