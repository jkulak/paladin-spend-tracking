import { renderHook } from '@testing-library/react-hooks';
import { useDataLoader } from './DataLoader';
import { mockTransactions } from './mockTransactions';

describe('useDataLoader', () => {
    it('should fetch data when called', async () => {
        // Mock fetch and its response
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(mockTransactions),
            })
        );

        const { result, waitForNextUpdate } = renderHook(() => useDataLoader('note', jest.fn(), 'id', 'asc'));

        // Wait for the hook to run useEffect and call the API
        await waitForNextUpdate();

        // Check if fetch was called
        expect(global.fetch).toHaveBeenCalled();

        // Reset fetch to its original implementation
        global.fetch.mockRestore();
    });
});
