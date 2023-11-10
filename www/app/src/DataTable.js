import React, { useEffect, useState, useCallback } from 'react';
import './DataTable.css';

const DataTable = ({ searchTerm }) => {
    const MAX_RESULTS = 50;
    const [transactions, setTransactions] = useState([]);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    const debouncedApiCall = useCallback(
        debounce((nextValue) => setDebouncedSearchTerm(nextValue), 500),
        [] // will be created only once initially
    );

    useEffect(() => {
        debouncedApiCall(searchTerm);
    }, [searchTerm, debouncedApiCall]);

    const handleHeaderClick = (column) => {
        setSortDirection(sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc');
        setSortColumn(column);
    };

    useEffect(() => {
        const sortQuery = sortColumn ? `order=${sortColumn}.${sortDirection}` : '';
        const searchQuery = searchTerm ? `&note=ilike.*${encodeURIComponent(searchTerm)}*` : '';
        fetch(`http://localhost:3000/transaction_view?${sortQuery}${searchQuery}&limit=${MAX_RESULTS}`)
            .then(response => response.json())
            .then(data => setTransactions(Array.isArray(data) ? data : []))
            .catch(error => console.error('Error fetching data: ', error));
    }, [debouncedSearchTerm, sortColumn, sortDirection]);

    return (
        <div className="DataTable">
            <h2>Data Table</h2>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => handleHeaderClick('id')}>ID {sortColumn === 'id' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}</th>
                        <th onClick={() => handleHeaderClick('date')}>Date {sortColumn === 'date' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}</th>
                        <th onClick={() => handleHeaderClick('value')}>Value {sortColumn === 'value' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}</th>
                        <th onClick={() => handleHeaderClick('payee_name')}>Payee Name {sortColumn === 'payee_name' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}</th>
                        <th onClick={() => handleHeaderClick('category_name')}>Category Name {sortColumn === 'category_name' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}</th>
                        <th onClick={() => handleHeaderClick('note')}>Note {sortColumn === 'note' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(transaction => (
                        <tr key={transaction.id}>
                            <td>{transaction.id}</td>
                            <td>{transaction.date}</td>
                            <td>{transaction.value}</td>
                            <td>{transaction.payee_name}</td>
                            <td>{transaction.category_name}</td>
                            <td>{transaction.note}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;
