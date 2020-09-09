import React from 'react';
import {
    render,
    fireEvent,
    waitFor,
    screen
} from '@testing-library/react'
import UsersList from './UsersList';

const users = [{
        "name": "John Doe",
        "email": "john@1mail.com",
        "id": "oCNqTPS"
    },
    {
        "name": "broadcast 33321",
        "email": "software.lord@gmail.com",
        "id": "ZA6WOhs"
    },
    {
        "name": "Asad Iqbal 123",
        "email": "mati.s@amail.com",
        "id": "IiIblBy"
    }
];

test('UsersList working as expected', async () => {
    const { getByText } = render( < UsersList users = {users} />);
    const name = await waitFor(() => getByText(/John Doe/i))
    expect(name).toHaveTextContent('John Doe');
})