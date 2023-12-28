

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('loads and displays transactions',  async () => {
    render(<App />);
    const searchInput = screen.getByRole('textbox');
    userEvent.type(searchInput, 'note');
    


    // and click the "Search" button

    // check that the table contains the expected transactions



});
