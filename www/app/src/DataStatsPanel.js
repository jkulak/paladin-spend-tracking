import React from 'react';
import './DataStatsPanel.css';

const DataStatsPanel = ({ totalValue }) => {
    return <div className="DataStatsPanel"><h2>Data Stats Panel</h2><p>Sum: {totalValue}</p></div>;
};

export default DataStatsPanel;
