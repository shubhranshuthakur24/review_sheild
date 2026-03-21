import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Sentiment = 'positive' | 'neutral' | 'negative';
export type Platform = 'google' | 'facebook' | 'trustpilot' | 'zomato' | 'practo' | 'justdial';

export interface Review {
  id: string;
  platform: Platform;
  rating: number;
  text: string;
  author: string;
  authorImage?: string;
  date: string;
  sentiment: Sentiment;
  isReplied: boolean;
  replyText?: string;
  replyDate?: string;
  location: string;
}

interface ReviewsState {
  items: Review[];
  loading: boolean;
  selectedIds: string[];
  filters: {
    platform: Platform | 'all';
    rating: number | 'all';
    sentiment: Sentiment | 'all';
    isReplied: boolean | 'all';
    location: string | 'all';
    dateRange: 'all' | 'today' | '7d' | '30d';
    search: string;
  };
}

const initialState: ReviewsState = {
  items: [
    {
      id: 'rev-1',
      platform: 'google',
      rating: 5,
      text: 'Exemplary service! The staff was incredibly attentive and the atmosphere was premium.',
      author: 'Jonathan Wick',
      date: '2024-03-21T10:00:00Z',
      sentiment: 'positive',
      isReplied: true,
      replyText: 'Thank you Jonathan! We strive for excellence.',
      location: 'Downtown'
    },
    {
      id: 'rev-2',
      platform: 'facebook',
      rating: 2,
      text: 'Long wait times today. The service was slow despite not being very busy.',
      author: 'Sarah Jenkins',
      date: '2024-03-22T09:15:00Z',
      sentiment: 'negative',
      isReplied: false,
      location: 'Downtown'
    },
    {
      id: 'rev-3',
      platform: 'google',
      rating: 4,
      text: 'Great experience, food was top notch but music was a bit too loud for a lunch meeting.',
      author: 'Michael Chen',
      date: '2024-03-22T11:30:00Z',
      sentiment: 'positive',
      isReplied: false,
      location: 'Westside'
    },
    {
      id: 'rev-4',
      platform: 'trustpilot',
      rating: 5,
      text: 'Absolutely love the new menu. Highly recommend the espresso martini.',
      author: 'Emily Blunt',
      date: '2024-03-10T14:20:00Z',
      sentiment: 'positive',
      isReplied: false,
      location: 'Airport'
    }
  ],
  loading: false,
  selectedIds: [],
  filters: {
    platform: 'all',
    rating: 'all',
    sentiment: 'all',
    isReplied: 'all',
    location: 'all',
    dateRange: 'all',
    search: ''
  }
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    setReviews: (state, action: PayloadAction<Review[]>) => {
      state.items = action.payload;
    },
    updateReviewReply: (state, action: PayloadAction<{ id: string; replyText: string }>) => {
      const review = state.items.find(r => r.id === action.payload.id);
      if (review) {
        review.isReplied = true;
        review.replyText = action.payload.replyText;
        review.replyDate = new Date().toISOString();
      }
    },
    setFilters: (state, action: PayloadAction<Partial<ReviewsState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    toggleSelection: (state, action: PayloadAction<string>) => {
      if (state.selectedIds.includes(action.payload)) {
        state.selectedIds = state.selectedIds.filter(id => id !== action.payload);
      } else {
        state.selectedIds.push(action.payload);
      }
    },
    selectAll: (state, action: PayloadAction<string[]>) => {
      state.selectedIds = action.payload;
    },
    clearSelection: (state) => {
      state.selectedIds = [];
    },
    bulkDelete: (state) => {
      state.items = state.items.filter(item => !state.selectedIds.includes(item.id));
      state.selectedIds = [];
    },
    bulkMarkReplied: (state) => {
      state.items.forEach(item => {
        if (state.selectedIds.includes(item.id)) {
          item.isReplied = true;
          item.replyText = 'Replied via bulk action';
          item.replyDate = new Date().toISOString();
        }
      });
      state.selectedIds = [];
    }
  }
});

export const { 
  setReviews, 
  updateReviewReply, 
  setFilters, 
  toggleSelection, 
  selectAll, 
  clearSelection,
  bulkDelete,
  bulkMarkReplied
} = reviewsSlice.actions;
export default reviewsSlice.reducer;
