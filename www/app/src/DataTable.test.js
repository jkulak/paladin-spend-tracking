import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
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
            expect(screen.getAllByText(transaction.id).length).toBe(mockTransactions.filter(t => t.id === transaction.id).length);
            expect(screen.getAllByText(transaction.date).length).toBe(mockTransactions.filter(t => t.date === transaction.date).length);
            expect(screen.getAllByText(transaction.value).length).toBe(mockTransactions.filter(t => t.value === transaction.value).length);
            expect(screen.getAllByText(transaction.payee_name).length).toBe(mockTransactions.filter(t => t.payee_name === transaction.payee_name).length);
            expect(screen.getAllByText(transaction.category_name).length).toBe(mockTransactions.filter(t => t.category_name === transaction.category_name).length);
            expect(screen.getAllByText(transaction.note).length).toBe(mockTransactions.filter(t => t.note === transaction.note).length);
        });
    });
    
    it('sorts the table when the ID column header is clicked', () => {
        const mockOnSort = jest.fn();
        render(<DataTable transactions={mockTransactions} onSort={mockOnSort} />);

        fireEvent.click(screen.getByText('ID'));

        expect(mockOnSort).toHaveBeenCalledWith('id', 'asc');
    });

    it('sorts the table when the Date column header is clicked', () => {
        const mockOnSort = jest.fn();
        render(<DataTable transactions={mockTransactions} onSort={mockOnSort} />);

        fireEvent.click(screen.getByText('Date'));

        expect(mockOnSort).toHaveBeenCalledWith('date', 'asc');
    });

    it('sorts the table when the Value column header is clicked', () => {
        const mockOnSort = jest.fn();
        render(<DataTable transactions={mockTransactions} onSort={mockOnSort} />);

        fireEvent.click(screen.getByText('Value'));

        expect(mockOnSort).toHaveBeenCalledWith('value', 'asc');
    });

    it('sorts the table when the Payee Name column header is clicked', () => {
        const mockOnSort = jest.fn();
        render(<DataTable transactions={mockTransactions} onSort={mockOnSort} />);

        fireEvent.click(screen.getByText('Payee Name'));

        expect(mockOnSort).toHaveBeenCalledWith('payee_name', 'asc');
    });

    it('sorts the table when the Category Name column header is clicked', () => {
        const mockOnSort = jest.fn();
        render(<DataTable transactions={mockTransactions} onSort={mockOnSort} />);

        fireEvent.click(screen.getByText('Category Name'));

        expect(mockOnSort).toHaveBeenCalledWith('category_name', 'asc');
    });

    it('sorts the table when the Note column header is clicked', () => {
        const mockOnSort = jest.fn();
        render(<DataTable transactions={mockTransactions} onSort={mockOnSort} />);

        fireEvent.click(screen.getByText('Note'));

        expect(mockOnSort).toHaveBeenCalledWith('note', 'asc');
    });
});
