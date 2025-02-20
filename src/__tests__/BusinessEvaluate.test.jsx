import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BusinessEvaluate from '../pages/BusinessEvaluate';

// Mock the AuthProvider
vi.mock('../contexts/AuthProvider', () => ({
  useAuth: () => ({
    isLoggedIn: true,
  }),
}));

test('renders form fields correctly', () => {
  render(
    <MemoryRouter>
      <BusinessEvaluate />
    </MemoryRouter>
  );

  expect(screen.getByLabelText(/Profit \(SDE\)/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Annual Revenue/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Industry/i)).toBeInTheDocument();
});

// test('shows error if form is submitted with missing fields', async () => {
//   render(
//     <MemoryRouter>
//       <BusinessEvaluate />
//     </MemoryRouter>
//   );

//   fireEvent.click(screen.getByText(/Calculate Valuation/i)); // Submit form

//   // Use `findByText` instead of `getByText`
//   //   expect(
//   //     await screen.findByText(/Please provide all required fields/i)
//   //   ).toBeInTheDocument();
//   expect(
//     await screen.findByText(/Please fill out this field./i)
//   ).toBeInTheDocument();
// });

test('updates state when user types into inputs', () => {
  render(
    <MemoryRouter>
      <BusinessEvaluate />
    </MemoryRouter>
  );

  const input = screen.getByLabelText(/Profit \(SDE\)/i);
  fireEvent.change(input, { target: { value: '150000' } });

  expect(input.value).toBe('150000');
});
