import { act, fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import App from './App';
import { mockTransactions } from './mockTransactions';

// Mock the useDataLoader hook to return the mockTransactions data
jest.mock('./DataLoader', () => ({
  useDataLoader: jest.fn(() => mockTransactions),
}));

test('loads and displays transactions', async () => {
  const { getByLabelText, findByText } = render(<App />);

  // Simulate entering "note" in the Filtering Form input
  await act(async () => {
    fireEvent.change(getByLabelText(/Search/i), { target: { value: 'note' } });
  });

  await waitFor(() => {
    expect(searchInput.value).toBe('note');
  });


  // Check if the transactions are displayed correctly
  for (const transaction of mockTransactions) {
    const element = await findByText(transaction.note, { exact: false });
    expect(element).toBeInTheDocument();
  }
});
