import React from 'react';
import DataStatsPanel from './DataStatsPanel';
import DataTable from './DataTable';
import FilteringForm from './FilteringForm';
import UserProfile from './UserProfile';

function App() {
  return (
    <div>
      <UserProfile />
      <FilteringForm />
      <DataStatsPanel />
      <DataTable />
    </div>
  );
}

export default App;
