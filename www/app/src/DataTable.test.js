import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useDataLoader } from './DataLoader';
import DataTable from './DataTable';

jest.mock('./DataLoader');

describe('DataTable', () => {
    it('renders the correct data when transactions state changes', () => {
        useDataLoader.mockReturnValue({
            transactions: [
                { id: 1, date: '2021-01-01', value: 100, payee_name: 'John Doe', category_name: 'Groceries', note: 'Test note' },
                { id: 2, date: '2021-02-01', value: 200, payee_name: 'Jane Doe', category_name: 'Rent', note: 'Rent payment' },
                { id: 3, date: '2021-03-01', value: 300, payee_name: 'Bob Smith', category_name: 'Utilities', note: 'Electricity bill' },
                { id: 4, date: '2021-04-01', value: 400, payee_name: 'Alice Johnson', category_name: 'Groceries', note: 'Grocery shopping' },
                { id: 5, date: '2021-05-01', value: 500, payee_name: 'Charlie Brown', category_name: 'Entertainment', note: 'Movie tickets' },
            ],
            error: null,
        });

        const { getByText, getAllByText } = render(<DataTable searchTerm="" />);

        expect(getByText('1')).toBeInTheDocument();
        expect(getByText('2021-01-01')).toBeInTheDocument();
        expect(getByText('100')).toBeInTheDocument();
        expect(getByText('John Doe')).toBeInTheDocument();
        const groceriesElements = getAllByText('Groceries');
        expect(groceriesElements[0]).toBeInTheDocument();
        expect(groceriesElements[1]).toBeInTheDocument();
        expect(getByText('Test note')).toBeInTheDocument();
    });

    it('sorts data correctly when column header is clicked', () => {
        useDataLoader.mockReturnValue({
            transactions: [
                { id: 1, date: '2021-01-01', value: 100, payee_name: 'John Doe', category_name: 'Groceries', note: 'Test note' },
                { id: 2, date: '2021-02-01', value: 200, payee_name: 'Jane Doe', category_name: 'Rent', note: 'Rent payment' },
                { id: 3, date: '2021-03-01', value: 300, payee_name: 'Bob Smith', category_name: 'Utilities', note: 'Electricity bill' },
                { id: 4, date: '2021-04-01', value: 400, payee_name: 'Alice Johnson', category_name: 'Groceries', note: 'Grocery shopping' },
                { id: 5, date: '2021-05-01', value: 500, payee_name: 'Charlie Brown', category_name: 'Entertainment', note: 'Movie tickets' },
            ],
            error: null,
        });

        const { getByText, getByTestId } = render(<DataTable searchTerm="" />);

        // Click the 'Value' column header to sort by value in ascending order
        fireEvent.click(getByTestId('valueHeader'));
        // Check that the first row has the smallest value
        expect(getByText('100')).toBeInTheDocument();

        // Click the 'Value' column header again to sort by value in descending order
        fireEvent.click(getByTestId('valueHeader'));
        // Check that the first row has the largest value
        expect(getByText('500')).toBeInTheDocument();
    });
});
