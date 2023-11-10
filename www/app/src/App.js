import React from 'react';
import UserProfile from './UserProfile';
import FilteringForm from './FilteringForm';
import DataStatsPanel from './DataStatsPanel';
import DataTable from './DataTable';

const App = () => {
    return (
        <div>
            <UserProfile />
            <FilteringForm />
            <DataStatsPanel />
            <DataTable />
        </div>
    );
};

export default App;
