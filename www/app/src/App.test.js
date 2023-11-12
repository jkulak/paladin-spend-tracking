import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';
import { mockTransactions } from './mockTransactions';

// Mock the useDataLoader hook to return the mockTransactions data
jest.mock('./DataLoader', () => ({
  useDataLoader: jest.fn(() => mockTransactions),
}));

test('loads and displays transactions', async () => {
  const { getByLabelText, findByText } = render(<App />);

  // Simulate entering "note" in the Filtering Form input
  fireEvent.change(getByLabelText(/Search/i), { target: { value: 'note' } });

  // Check if the transactions are displayed correctly
  for (const transaction of mockTransactions) {
    const element = await findByText(transaction.note, { exact: false });
    expect(element).toBeInTheDocument();
  }
});
