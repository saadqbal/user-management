import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import App from './App';

test('App renders without crashing', async () => {
  const { getByText, findByText } = render(<App />);
  // check to see if the Users List is loaded
  const testCase = 'Loading...';
  await waitFor(() => findByText(testCase))
  const email = screen.getByText(testCase)
  expect(email.textContent).toBe(testCase)
});


