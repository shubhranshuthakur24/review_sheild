import { describe, it, expect } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from './test-utils';
import RatingPage from '../pages/funnel/RatingPage';
import ActionPage from '../pages/funnel/ActionPage';
import FeedbackPage from '../pages/funnel/FeedbackPage';
import LandingPage from '../pages/funnel/LandingPage';

describe('Funnel Regression Flow', () => {
  it('navigates from Landing to Rating and branches correctly', async () => {
    // 1. Landing Page
    const { store } = renderWithProviders(<LandingPage />);
    const cta = screen.getByText(/share my experience/i);
    fireEvent.click(cta);
    expect(store.getState().funnel.currentStep).toBe('rating');

    // 2. Rating Page (Positive Branch)
    renderWithProviders(<RatingPage />, { store });
    const fiveStar = screen.getByRole('button', { name: /5 stars/i });
    fireEvent.click(fiveStar);
    expect(store.getState().funnel.rating).toBe(5);
    expect(store.getState().funnel.currentStep).toBe('action');

    // 3. Action Page (Positive)
    renderWithProviders(<ActionPage />, { store });
    expect(screen.getByText(/boost our reputation/i)).toBeInTheDocument();
    const feedbackBtn = screen.getByText(/share private feedback/i);
    fireEvent.click(feedbackBtn);
    expect(store.getState().funnel.currentStep).toBe('feedback');

    // 4. Feedback Page
    renderWithProviders(<FeedbackPage />, { store });
    const textarea = screen.getByPlaceholderText(/describe your experience/i);
    fireEvent.change(textarea, { target: { value: 'Everything was perfect!' } });
    const submitBtn = screen.getByText(/submit feedback/i);
    fireEvent.click(submitBtn);
    expect(store.getState().funnel.currentStep).toBe('success');
  });

  it('navigates to support for low ratings', async () => {
    const { store } = renderWithProviders(<RatingPage />);
    const threeStar = screen.getByRole('button', { name: /3 stars/i });
    fireEvent.click(threeStar);
    
    renderWithProviders(<ActionPage />, { store });
    expect(screen.getByText(/let us make it right/i)).toBeInTheDocument();
  });
});
