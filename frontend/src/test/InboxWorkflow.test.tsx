import { describe, it, expect } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithProviders } from './test-utils';
import InboxPage from '../pages/dashboard/InboxPage';

describe('Inbox Regression Flow', () => {
  it('filters reviews and opens the reply editor', async () => {
    const { store } = renderWithProviders(<InboxPage />);
    
    // Initial count check
    expect(screen.getByText(/review inbox/i)).toBeInTheDocument();
    
    // Search
    const searchInput = screen.getByPlaceholderText(/search by customer name/i);
    fireEvent.change(searchInput, { target: { value: 'John' } });
    
    // Expand a review (Reply Now button)
    const replyBtns = screen.getAllByText(/reply now/i);
    fireEvent.click(replyBtns[0]);
    
    // AI Reply logic in editor
    expect(screen.getByText(/response composer/i)).toBeInTheDocument();
    const aiBtn = screen.getByText(/ai write/i);
    fireEvent.click(aiBtn);
    
    // Wait for mock AI delay
    await waitFor(() => {
      const textarea = screen.getByPlaceholderText(/type your response here/i) as HTMLTextAreaElement;
      expect(textarea.value).not.toBe('');
    }, { timeout: 3000 });
    
    // Submit reply
    const postBtn = screen.getByText(/post reply/i);
    fireEvent.click(postBtn);
    
    // Check state update
    expect(store.getState().reviews.items.some((r: any) => r.isReplied)).toBe(true);
  });
});
