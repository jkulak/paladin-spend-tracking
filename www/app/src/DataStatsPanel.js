import React from 'react';
import './DataStatsPanel.css';

const DataStatsPanel = ({ totalValue }) => {
    return (
      <div className="DataStatsPanel">
        <h2>Data Stats Panel</h2>
        <p className={totalValue >= 0 ? 'positiveValue' : 'negativeValue'}>Sum: {totalValue} PLN</p>
      </div>
    );
};

export default DataStatsPanel;
