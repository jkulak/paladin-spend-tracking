import { useCallback, useEffect, useState } from 'react';
import { API_URL } from './constants';

const useDataLoader = (searchTerm, setTransactions) => {
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    const debouncedApiCall = useCallback(
        debounce((nextValue) => setDebouncedSearchTerm(nextValue), 800),
        [] // will be created only once initially
    );

    useEffect(() => {
        debouncedApiCall(searchTerm);
    }, [searchTerm, debouncedApiCall]);

    useEffect(() => {
        const sortQuery = sortColumn ? `order=${sortColumn}.${sortDirection}` : '';
        const searchQuery = searchTerm ? `&note=ilike.*${encodeURIComponent(searchTerm)}*` : '';


        fetch(`${API_URL}?${sortQuery}${searchQuery}&limit=${maxResults}`)
            .then(response => response.json())
            .then(data => setTransactions(Array.isArray(data) ? data : []))
            .catch(error => setError('Error fetching data: ', error));
    }, [debouncedSearchTerm, sortColumn, sortDirection]);

    return { transactions, error };
};

export { useDataLoader };
