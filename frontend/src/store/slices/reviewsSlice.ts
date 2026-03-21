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
  filters: {
    platform: Platform | 'all';
    rating: number | 'all';
    sentiment: Sentiment | 'all';
    isReplied: boolean | 'all';
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
    }
  ],
  loading: false,
  filters: {
    platform: 'all',
    rating: 'all',
    sentiment: 'all',
    isReplied: 'all',
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
    bulkAction: (_state, action: PayloadAction<{ ids: string[]; type: 'archive' | 'reply' }>) => {
      // Logic for bulk actions
      console.log(`Bulk ${action.payload.type} for:`, action.payload.ids);
    }
  }
});

export const { setReviews, updateReviewReply, setFilters, bulkAction } = reviewsSlice.actions;
export default reviewsSlice.reducer;
