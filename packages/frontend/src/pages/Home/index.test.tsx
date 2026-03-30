import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { HomePage } from './index';

describe('HomePage', () => {
  it('renders the main heading', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Welcome to Harfai');
  });

  it('has a link to users page', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    const link = screen.getByRole('link', { name: /view users/i });
    expect(link).toHaveAttribute('href', '/users');
  });
});
