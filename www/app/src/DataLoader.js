import { useCallback, useEffect, useState } from 'react';
import { API_URL, DEBOUNCE_TIME, DISPLAY_MAX } from './constants';

const useDataLoader = (searchTerm, valueFilter, setTransactions, sortColumn, sortDirection) => {
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
        const valueQuery = valueFilter === 'expense' ? '&value=lt.0' : '&value=gt.0';
        const sortQuery = sortColumn ? `&order=${sortColumn}.${sortDirection}` : '';
        const finalQuery = searchQuery ? `${searchQuery}${valueQuery}${sortQuery}` : `?${valueQuery.slice(1)}${sortQuery}`;

        fetch(`${API_URL}${finalQuery}&limit=${DISPLAY_MAX}`)
            .then(response => response.json())
            .then(data => setTransactions(Array.isArray(data) ? data : []))
            .catch(error => console.error('Error fetching data: ', error));
    }, [setTransactions, debouncedSearchTerm, valueFilter, sortColumn, sortDirection]);

};

export { useDataLoader };
