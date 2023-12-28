import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockTransactions } from './mockTransactions';
import App from './App';
import { DEBOUNCE_TIME } from './constants';

// Mock the fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockTransactions),
  })
);

beforeEach(() => {
  fetch.mockClear();
});

test('loads and displays transactions', async () => {
  render(<App />);
  
  // Simulate user input
  userEvent.type(screen.getByRole('textbox'), 'note');

  // Wait for debounce and API request
  await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1), { timeout: DEBOUNCE_TIME + 100 });

  // Check if the data is loaded and displayed correctly
  expect(screen.getByText('Test note')).toBeInTheDocument();
});
