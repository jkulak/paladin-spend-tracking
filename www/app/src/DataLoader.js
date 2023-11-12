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
        const searchQuery = debouncedSearchTerm ? `?note=ilike.*${encodeURIComponent(debouncedSearchTerm)}*` : '';

        fetch(`${API_URL}${searchQuery}`)
            .then(response => response.json())
            .then(data => setTransactions(Array.isArray(data) ? data : []))
            .catch(error => console.error('Error fetching data: ', error));
    }, [debouncedSearchTerm]);

};

export { useDataLoader };
