import React from 'react';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import App, { SERVER_URL } from './App';

const server = setupServer(
  rest.get(`${SERVER_URL}`, (req, res, ctx) => {
    return res(ctx.json([{
      "name": "Klik",
      "email": "asad@mail.com",
      "id": "oCNqTPS"
    },
    {
      "name": "Asad iqbal",
      "email": "software.lord@gmail.com",
      "id": "ZA6WOhs"
    },
    {
      "name": "Asad Iqbal 123",
      "email": "mati.s@amail.com",
      "id": "IiIblBy"
    }]))
  }),
  rest.post(`${SERVER_URL}`, (req, res, ctx) => {
    const { name, email } = req.body;
    return res(ctx.json({
        "name": name,
        "email": email,
        "id": "testUserID"
      }))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('App renders without crashing', async () => {
  const { getByText, findByText } = render(<App />);
  // check to see if the Users List is loaded
  const testCase = 'software.lord@gmail.com'
  await waitFor(() => findByText(testCase))
  const email = screen.getByText(testCase)
  expect(email.textContent).toBe(testCase)
});

test('Adding New User working', async () => {
  const { findByText, getByText } = render(<App />);
  const testcase = 'test@test.com';
  const addUserButton = await waitFor(() => screen.getByRole('button', { name: 'Add User' }))
  fireEvent.click(addUserButton)
  const nameInput = screen.getByPlaceholderText('Enter name')
  const emailInput = screen.getByPlaceholderText('Enter email')
  await waitFor(() => fireEvent.change(nameInput, { target: { value: 'Test User' } }));
  await waitFor(() => fireEvent.change(emailInput, { target: { value: testcase } }));
  const submit = await waitFor(() => screen.getByRole('button', { name: 'Save User' }))
  await waitFor(() => fireEvent.click(submit));
  const td = await waitFor(() => findByText(testcase))
  expect(td.textContent).toBe(testcase)
});