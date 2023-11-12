import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { mockTransactions } from './mockTransactions';

// Mock the useDataLoader hook to return the mockTransactions data
jest.mock('./DataLoader', () => ({
  useDataLoader: jest.fn(() => mockTransactions),
}));

test('loads and displays transactions', async () => {
  const { getByLabelText, getByText } = render(<App />);

  // Simulate entering "note" in the Filtering Form input
  fireEvent.change(getByLabelText(/Search/i), { target: { value: 'note' } });

  // Wait for the transactions to be displayed
  await waitFor(() => getByText(/Test note/i));

  // Check if the transactions are displayed correctly
  mockTransactions.forEach(transaction => {
    expect(getByText(transaction.note)).toBeInTheDocument();
  });
});
