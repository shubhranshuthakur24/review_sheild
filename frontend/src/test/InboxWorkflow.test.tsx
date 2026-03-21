import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from './test-utils';
import InboxPage from '../pages/dashboard/InboxPage';

describe('Inbox Regression Flow', () => {
  it('renders without crashing', async () => {
    renderWithProviders(<InboxPage />);
    expect(screen.getByText(/review inbox/i)).toBeInTheDocument();
  });
});
