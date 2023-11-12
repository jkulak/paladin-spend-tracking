import { useCallback, useEffect, useState } from 'react';
import { API_URL, DEBOUNCE_TIME, DISPLAY_MAX } from './constants';

const useDataLoader = (searchTerm, setTransactions, sortColumn, sortDirection) => {
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

    // Implement the debounce logic directly within useCallback
    const debouncedApiCall = useCallback(
        (nextValue) => {
            const handler = setTimeout(() => {
                setDebouncedSearchTerm(nextValue);
            }, DEBOUNCE_TIME);

            return () => {
                clearTimeout(handler);
            };
        },
        [setDebouncedSearchTerm] // Dependencies
    );

    useEffect(() => {
        const debounceHandler = debouncedApiCall(searchTerm);
        return () => {
            if (debounceHandler) debounceHandler();
        };
    }, [searchTerm, debouncedApiCall]);

    useEffect(() => {
        const searchQuery = debouncedSearchTerm ? `?note=ilike.*${encodeURIComponent(debouncedSearchTerm)}*` : '';
        const sortQuery = sortColumn ? `&order=${sortColumn}.${sortDirection}` : '';
        const finalQuery = searchQuery ? `${searchQuery}${sortQuery}` : `?${sortQuery.slice(1)}`;

        fetch(`${API_URL}${finalQuery}&limit=${DISPLAY_MAX}`)
            .then(response => response.json())
            .then(data => setTransactions(Array.isArray(data) ? data : []))
            .catch(error => console.error('Error fetching data: ', error));
    }, [setTransactions, debouncedSearchTerm, sortColumn, sortDirection]);

};

export { useDataLoader };
