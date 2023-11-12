import React, { useState } from 'react';
import './DataTable.css';

const DataTable = ({ transactions, onSort, onTagClick }) => {
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');

    const handleHeaderClick = (column) => {
        const newDirection = sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
        setSortDirection(newDirection);
        setSortColumn(column);
        onSort(column, newDirection);
    };

    return (
        <div className="DataTable">
            <h2>Data Table</h2>
            <table>
                <thead>
                    <tr>
                        <th id="idHeader" onClick={() => handleHeaderClick('id')}>ID {sortColumn === 'id' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}</th>
                        <th id="dateHeader" onClick={() => handleHeaderClick('date')}>Date {sortColumn === 'date' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}</th>
                        <th id="valueHeader" onClick={() => handleHeaderClick('value')}>Value {sortColumn === 'value' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}</th>
                        <th id="payeeNameHeader" onClick={() => handleHeaderClick('payee_name')}>Payee Name {sortColumn === 'payee_name' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}</th>
                        <th id="categoryNameHeader" onClick={() => handleHeaderClick('category_name')}>Category Name {sortColumn === 'category_name' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}</th>
                        <th id="noteHeader" onClick={() => handleHeaderClick('note')}>Note {sortColumn === 'note' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}</th>
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
                            <td>{highlightTags(transaction.note, onTagClick)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;
function highlightTags(note, onTagClick) {
    return note.split(/(#\w+)/g).map((word, index) => {
        if (word.startsWith('#')) {
            return <span key={index} className="tag" onClick={() => onTagClick(word.slice(1))}>{word}</span>;
        } else {
            return word;
        }
    });
}
