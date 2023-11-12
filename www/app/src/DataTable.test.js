import React from 'react';
import { render, screen } from '@testing-library/react';
import DataTable from './DataTable';

describe('DataTable', () => {
    const mockTransactions = [
        { id: 1, date: '2021-01-01', value: 100, payee_name: 'John Doe', category_name: 'Groceries', note: 'Test note' },
        { id: 2, date: '2021-02-01', value: 200, payee_name: 'John Doe', category_name: 'Rent', note: 'Rent payment' },
        { id: 3, date: '2021-03-01', value: 300, payee_name: 'Alice Johnson', category_name: 'Groceries', note: 'Electricity bill' },
        { id: 4, date: '2021-04-01', value: -440, payee_name: 'Alice Johnson', category_name: 'Groceries', note: 'Grocery shopping' },
        { id: 5, date: '2021-05-01', value: -550, payee_name: 'Charlie Brown', category_name: 'Entertainment', note: 'Movie tickets' },
    ];

    it('loads and displays transactions', () => {
        const mockOnSort = jest.fn();
        render(<DataTable transactions={mockTransactions} onSort={mockOnSort} />);

        mockTransactions.forEach(transaction => {
            expect(screen.getByText(transaction.id)).toBeInTheDocument();
            expect(screen.getByText(transaction.date)).toBeInTheDocument();
            expect(screen.getByText(transaction.value)).toBeInTheDocument();
            expect(screen.getByText(transaction.payee_name)).toBeInTheDocument();
            expect(screen.getByText(transaction.category_name)).toBeInTheDocument();
            expect(screen.getByText(transaction.note)).toBeInTheDocument();
        });
    });
});
