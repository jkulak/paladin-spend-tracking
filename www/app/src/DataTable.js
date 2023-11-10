import React, { useEffect, useState } from 'react';

const DataTable = () => {
    const [transactions, setTransactions] = useState([]);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');

    const handleHeaderClick = (column) => {
        setSortDirection(sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc');
        setSortColumn(column);
    };

    useEffect(() => {
        const sortQuery = sortColumn ? `order=${sortColumn}.${sortDirection}` : '';
        fetch(`http://localhost:3000/transaction_view?${sortQuery}`)
            .then(response => response.json())
            .then(data => setTransactions(data))
            .catch(error => console.error('Error fetching data: ', error));
    }, [sortColumn, sortDirection]);

    return (
        <div>
            <h2>Data Table</h2>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => handleHeaderClick('id')}>ID</th>
                        <th onClick={() => handleHeaderClick('date')}>Date</th>
                        <th onClick={() => handleHeaderClick('value')}>Value</th>
                        <th onClick={() => handleHeaderClick('payee_name')}>Payee Name</th>
                        <th onClick={() => handleHeaderClick('category_name')}>Category Name</th>
                        <th onClick={() => handleHeaderClick('note')}>Note</th>
                        <th onClick={() => handleHeaderClick('cleared')}>Cleared</th>
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
                            <td>{transaction.cleared ? 'Yes' : 'No'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <div>
            <h2>Data Table</h2>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => handleHeaderClick('id')}>ID</th>
                        <th onClick={() => handleHeaderClick('date')}>Date</th>
                        <th onClick={() => handleHeaderClick('value')}>Value</th>
                        <th onClick={() => handleHeaderClick('payee_name')}>Payee Name</th>
                        <th onClick={() => handleHeaderClick('category_name')}>Category Name</th>
                        <th onClick={() => handleHeaderClick('note')}>Note</th>
                        <th onClick={() => handleHeaderClick('cleared')}>Cleared</th>
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
                            <td>{transaction.cleared ? 'Yes' : 'No'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;
