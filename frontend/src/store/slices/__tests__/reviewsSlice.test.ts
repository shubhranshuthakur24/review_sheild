import { describe, it, expect } from 'vitest';
import reviewsReducer, { setFilters, updateReviewReply } from '../reviewsSlice';

describe('reviewsSlice', () => {
  const initialState = {
    items: [
      {
        id: '1',
        author: 'John Doe',
        rating: 5,
        text: 'Great service!',
        platform: 'google',
        date: '2024-03-20T10:00:00Z',
        sentiment: 'positive',
        isReplied: false,
        location: 'Downtown'
      }
    ],
    filters: {
      platform: 'all',
      rating: 'all',
      sentiment: 'all',
      isReplied: 'all',
      search: ''
    },
    status: 'idle',
    error: null
  };

  it('should handle setFilters', () => {
    const actual = reviewsReducer(initialState as any, setFilters({ platform: 'facebook' }));
    expect(actual.filters.platform).toBe('facebook');
    expect(actual.filters.rating).toBe('all');
  });

  it('should handle updateReviewReply', () => {
    const replyText = 'Thank you for your feedback!';
    const actual = reviewsReducer(initialState as any, updateReviewReply({ id: '1', replyText }));
    
    const review = actual.items.find(i => i.id === '1');
    expect(review?.isReplied).toBe(true);
    expect(review?.replyText).toBe(replyText);
    expect(review?.replyDate).toBeDefined();
  });

  it('should not update reply for non-existent id', () => {
    const actual = reviewsReducer(initialState as any, updateReviewReply({ id: '99', replyText: 'Hi' }));
    expect(actual.items[0].isReplied).toBe(false);
  });
});
