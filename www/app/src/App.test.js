import { mockTransactions } from './mockTransactions';

// Mock the useDataLoader hook to return the mockTransactions data
jest.mock('./DataLoader', () => ({
  useDataLoader: jest.fn(() => mockTransactions),
}));

test('loads and displays transactions', () => {

});
