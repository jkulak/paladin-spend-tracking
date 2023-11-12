import '@testing-library/jest-dom';

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
    ];

    
})
