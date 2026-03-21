import { describe, it, expect } from 'vitest';
import reviewsReducer, { 
  setFilters, 
  updateReviewReply, 
  toggleSelection, 
  selectAll, 
  clearSelection, 
  bulkDelete, 
  bulkMarkReplied 
} from '../reviewsSlice';

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
      },
      {
        id: '2',
        author: 'Jane Smith',
        rating: 4,
        text: 'Good experience.',
        platform: 'facebook',
        date: '2024-03-21T11:00:00Z',
        sentiment: 'positive',
        isReplied: false,
        location: 'Westside'
      }
    ],
    selectedIds: [],
    filters: {
      platform: 'all',
      rating: 'all',
      sentiment: 'all',
      isReplied: 'all',
      location: 'all',
      dateRange: 'all',
      search: ''
    },
    loading: false
  };

  it('should handle setFilters', () => {
    const actual = reviewsReducer(initialState as any, setFilters({ platform: 'facebook', location: 'Westside' }));
    expect(actual.filters.platform).toBe('facebook');
    expect(actual.filters.location).toBe('Westside');
  });

  it('should handle selection logic', () => {
    let state = reviewsReducer(initialState as any, toggleSelection('1'));
    expect(state.selectedIds).toContain('1');
    
    state = reviewsReducer(state, toggleSelection('1'));
    expect(state.selectedIds).not.toContain('1');

    state = reviewsReducer(state, selectAll(['1', '2']));
    expect(state.selectedIds).toHaveLength(2);

    state = reviewsReducer(state, clearSelection());
    expect(state.selectedIds).toHaveLength(0);
  });

  it('should handle bulkDelete', () => {
    const stateWithSelection = { ...initialState, selectedIds: ['1'] };
    const actual = reviewsReducer(stateWithSelection as any, bulkDelete());
    expect(actual.items).toHaveLength(1);
    expect(actual.items[0].id).toBe('2');
    expect(actual.selectedIds).toHaveLength(0);
  });

  it('should handle bulkMarkReplied', () => {
    const stateWithSelection = { ...initialState, selectedIds: ['1', '2'] };
    const actual = reviewsReducer(stateWithSelection as any, bulkMarkReplied());
    expect(actual.items.every(i => i.isReplied)).toBe(true);
    expect(actual.selectedIds).toHaveLength(0);
  });
});
