import React from 'react';
import { render } from '@testing-library/react';
import { useDataLoader } from './DataLoader';
import DataTable from './DataTable';

jest.mock('./DataLoader');

describe('DataTable', () => {
    it('renders the correct data when transactions state changes', () => {
        useDataLoader.mockReturnValue({
            transactions: [
                { id: 1, date: '2021-01-01', value: 100, payee_name: 'John Doe', category_name: 'Groceries', note: 'Test note' },
            ],
            error: null,
        });

        const { getByText } = render(<DataTable searchTerm="" />);

        expect(getByText('1')).toBeInTheDocument();
        expect(getByText('2021-01-01')).toBeInTheDocument();
        expect(getByText('100')).toBeInTheDocument();
        expect(getByText('John Doe')).toBeInTheDocument();
        expect(getByText('Groceries')).toBeInTheDocument();
        expect(getByText('Test note')).toBeInTheDocument();
    });
});
