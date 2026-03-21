import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FunnelState {
  currentStep: 'landing' | 'rating' | 'action' | 'redirect' | 'feedback' | 'success';
  rating: number | null;
  feedbackData: {
    message: string;
    category: string;
    contact?: string;
    attachment?: string;
  } | null;
  branding: {
    primaryColor: string;
    tone: 'professional' | 'friendly' | 'minimal';
    ctaText: string;
  };
  tracking: {
    source: string | null;
    campaign: string | null;
    visits: number;
    conversions: number;
  };
  metrics: {
    conversionRate: number;
    ratingDistribution: Record<number, number>;
    redirectCTR: Record<string, number>;
    feedbackRate: number;
  };
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
  feedbackData: null,
  branding: {
    primaryColor: '#6366f1', // Default Indigo
    tone: 'friendly',
    ctaText: 'Share My Experience',
  },
  tracking: {
    source: null,
    campaign: null,
    visits: 0,
    conversions: 0,
  },
  metrics: {
    conversionRate: 68.4,
    ratingDistribution: { 1: 5, 2: 12, 3: 25, 4: 142, 5: 842 },
    redirectCTR: { google: 45, facebook: 22, trustpilot: 18, zomato: 10, practo: 5 },
    feedbackRate: 31.6,
  },
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
      const steps: FunnelState['currentStep'][] = ['landing', 'rating', 'action', 'redirect', 'feedback', 'success'];
      const currentIndex = steps.indexOf(state.currentStep);
      
      // Special logic for branching from 'action'
      if (state.currentStep === 'action') {
        // In this implementation, 'action' page will explicitly call setStep (or we can use internal branching)
        state.currentStep = 'feedback'; 
        return;
      }

      if (currentIndex < steps.length - 1) {
        state.currentStep = steps[currentIndex + 1];
      }
    },
    setStep: (state, action: PayloadAction<FunnelState['currentStep']>) => {
      state.currentStep = action.payload;
    },
    setFeedback: (state, action: PayloadAction<NonNullable<FunnelState['feedbackData']>>) => {
      state.feedbackData = action.payload;
    },
    setRating: (state, action: PayloadAction<number>) => {
      state.rating = action.payload;
    },
    setTracking: (state, action: PayloadAction<{ source: string | null; campaign: string | null }>) => {
      state.tracking.source = action.payload.source;
      state.tracking.campaign = action.payload.campaign;
      state.tracking.visits += 1;
    },
    logConversion: (state) => {
      state.tracking.conversions += 1;
    },
    updateBranding: (state, action: PayloadAction<Partial<FunnelState['branding']>>) => {
      state.branding = { ...state.branding, ...action.payload };
    },
    resetFunnel: (state) => {
      state.currentStep = 'landing';
      state.rating = null;
      state.feedbackData = null;
    },
  },
});

export const { 
  setBusiness, 
  nextStep, 
  setStep, 
  setRating, 
  setFeedback, 
  setTracking,
  logConversion,
  updateBranding,
  resetFunnel 
} = funnelSlice.actions;
export default funnelSlice.reducer;
