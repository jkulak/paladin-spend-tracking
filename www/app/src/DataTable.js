import React, { useEffect, useState } from 'react';

const DataTable = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/transactions')
            .then(response => response.json())
            .then(data => setTransactions(data))
            .catch(error => console.error('Error fetching data: ', error));
    }, []);

    return (
        <div>
            <h2>Data Table</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Value</th>
                        <th>Payee ID</th>
                        <th>Category ID</th>
                        <th>Note</th>
                        <th>Cleared</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(transaction => (
                        <tr key={transaction.id}>
                            <td>{transaction.id}</td>
                            <td>{transaction.date}</td>
                            <td>{transaction.value}</td>
                            <td>{transaction.payee_id}</td>
                            <td>{transaction.category_id}</td>
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
