import React, { useState } from 'react';
import DataTable from './DataTable';
import FilteringForm from './FilteringForm';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div>
      {/* <UserProfile /> */}
      <FilteringForm onSearchTermChange={term => handleSearch(term)} />
      {/* <DataStatsPanel /> */}
      <DataTable searchTerm={searchTerm} />
    </div>
  );
}

export default App;
