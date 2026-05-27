import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the package search input', () => {
  render(<App />);

  expect(screen.getByRole('searchbox', { name: /search packages/i })).toBeInTheDocument();
});
