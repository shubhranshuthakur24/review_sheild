import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FunnelState {
  currentStep: 'landing' | 'rating' | 'feedback' | 'success';
  rating: number | null;
  businessId: string | null;
  businessName: string | null;
  logoUrl: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: FunnelState = {
  currentStep: 'landing',
  rating: null,
  businessId: null,
  businessName: 'Acme Coffee Roast',
  logoUrl: null,
  loading: false,
  error: null,
};

const funnelSlice = createSlice({
  name: 'funnel',
  initialState,
  reducers: {
    setBusiness: (state, action: PayloadAction<{ id: string; name: string; logo?: string }>) => {
      state.businessId = action.payload.id;
      state.businessName = action.payload.name;
      state.logoUrl = action.payload.logo || null;
    },
    nextStep: (state) => {
      const steps: FunnelState['currentStep'][] = ['landing', 'rating', 'feedback', 'success'];
      const currentIndex = steps.indexOf(state.currentStep);
      if (currentIndex < steps.length - 1) {
        state.currentStep = steps[currentIndex + 1];
      }
    },
    setRating: (state, action: PayloadAction<number>) => {
      state.rating = action.payload;
    },
    resetFunnel: (state) => {
      state.currentStep = 'landing';
      state.rating = null;
    },
  },
});

export const { setBusiness, nextStep, setRating, resetFunnel } = funnelSlice.actions;
export default funnelSlice.reducer;
