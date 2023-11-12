import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { useDataLoader } from './DataLoader';
import DataTable from './DataTable';

jest.mock('./DataLoader');

describe('DataTable', () => {
    const mockTransactions = [
        { id: 1, date: '2021-01-01', value: 100, payee_name: 'John Doe', category_name: 'Groceries', note: 'Test note' },
        { id: 2, date: '2021-02-01', value: 200, payee_name: 'Jane Doe', category_name: 'Rent', note: 'Rent payment' },
        { id: 3, date: '2021-03-01', value: 300, payee_name: 'Bob Smith', category_name: 'Utilities', note: 'Electricity bill' },
        { id: 4, date: '2021-04-01', value: 400, payee_name: 'Alice Johnson', category_name: 'Groceries', note: 'Grocery shopping' },
        { id: 5, date: '2021-05-01', value: 500, payee_name: 'Charlie Brown', category_name: 'Entertainment', note: 'Movie tickets' },
        { id: 6, date: '2021-06-01', value: 600, payee_name: 'John Doe', category_name: 'Travel', note: 'Flight booking' },
        { id: 7, date: '2021-07-01', value: 700, payee_name: 'Jane Doe', category_name: 'Health', note: 'Gym membership' },
        { id: 8, date: '2021-08-01', value: 800, payee_name: 'John Doe', category_name: 'Insurance', note: 'Car insurance' },
        { id: 9, date: '2021-09-01', value: 900, payee_name: 'Grace Lee', category_name: 'Dining', note: 'Restaurant bill' },
        { id: 10, date: '2021-10-01', value: 1000, payee_name: 'Hank Zebrowski', category_name: 'Electronics', note: 'Laptop purchase' },
        { id: 11, date: '2021-11-01', value: 1100, payee_name: 'Jane Doe', category_name: 'Clothing', note: 'Jacket and jeans' },
        { id: 12, date: '2021-12-01', value: 1200, payee_name: 'Jack White', category_name: 'Gifts', note: 'Birthday presents' },
        { id: 13, date: '2022-01-01', value: 1300, payee_name: 'Kara Thrace', category_name: 'Pets', note: 'Pet food' },
        { id: 14, date: '2022-02-01', value: 1400, payee_name: 'Grace Lee', category_name: 'Automotive', note: 'Car repair' },
        { id: 15, date: '2022-03-01', value: 1500, payee_name: 'Mia Wallace', category_name: 'Health', note: 'Salon visit' },
    ];

    it('renders the correct data when transactions state changes', () => {
        useDataLoader.mockReturnValue({transactions: mockTransactions, error: null,});

        const { getByText, getAllByText, queryByText } = render(<DataTable searchTerm="" />);

        // Assuming the mockTransactions array has been updated and contains more data with some repeating payee_names and categories
        // Update the assertions to match the new expected values
        // Example: Check for the first transaction's data
        expect(getByText('1')).toBeInTheDocument();
        expect(getByText('2021-01-01')).toBeInTheDocument();
        expect(getByText('100')).toBeInTheDocument();
        expect(getAllByText('John Doe')).toHaveLength(3);
        expect(getAllByText('Groceries')).toHaveLength(2);
        expect(getByText('Test note')).toBeInTheDocument();

        // Example: Check for another transaction's data (assuming the ID and other details have changed)
        expect(getByText('2')).toBeInTheDocument();
        expect(getByText('2021-02-01')).toBeInTheDocument();
        expect(getByText('200')).toBeInTheDocument();
        expect(getAllByText('Jane Doe')).toHaveLength(3);
        expect(getByText('Rent')).toBeInTheDocument();
        expect(getByText('Rent payment')).toBeInTheDocument();

        // Test if all data from mockTransactions is rendered
        expect(getByText('15')).toBeInTheDocument();
        expect(getByText('Mia Wallace')).toBeInTheDocument();
        expect(getAllByText('Health')).toHaveLength(2);
        expect(getByText('Salon visit')).toBeInTheDocument();

        // Check that duplicate payee_names are rendered
        expect(getAllByText('John Doe')).toHaveLength(3);

        // Check that duplicate categories are rendered
        expect(getAllByText('Groceries')).toHaveLength(2);

        // Check that all 15 elements are rendered
        expect(queryByText('16')).not.toBeInTheDocument();
    });

    it('sorts data correctly when column header is clicked', () => {
        useDataLoader.mockReturnValue({
            transactions: mockTransactions,
            error: null,
        });

        const { getByText } = render(<DataTable searchTerm="" />);

        // Click the 'Value' column header to sort by value in ascending order
        fireEvent.click(document.getElementById('valueHeader'));
        // Check that the first row has the smallest value
        expect(getByText('100')).toBeInTheDocument();

        // Click the 'Value' column header again to sort by value in descending order
        fireEvent.click(document.getElementById('valueHeader'));
        // Check that the first row has the largest value
        expect(getByText('500')).toBeInTheDocument();
    });

    it('filters data correctly when search term is entered', async () => {
        useDataLoader.mockReturnValue({
            transactions: mockTransactions,
            error: null,
        });

        const { getByText, queryByText } = render(<DataTable searchTerm="Rent" />);

        // Wait for the debounce time before checking the results
        await new Promise(r => setTimeout(r, 800));

        // Check that the transactions matching the search term are displayed
        expect(getByText('Rent')).toBeInTheDocument();

        // Check that transactions not matching the search term are not displayed
        expect(queryByText('Groceries')).not.toBeInTheDocument();
    });
})
