import { describe, it, expect } from 'vitest';
import funnelReducer, { setRating, setTracking, updateBranding } from '../funnelSlice';

describe('funnelSlice', () => {
  const initialState = {
    currentStep: 'landing',
    rating: null,
    businessId: null,
    businessName: 'Acme Coffee Roast',
    logoUrl: null,
    feedbackData: null,
    branding: {
      primaryColor: '#6366f1',
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

  it('should handle setRating', () => {
    const actual = funnelReducer(initialState as any, setRating(4));
    expect(actual.rating).toBe(4);
  });

  it('should handle setTracking', () => {
    const data = { source: 'sms', campaign: 'summer_promo' };
    const actual = funnelReducer(initialState as any, setTracking(data));
    expect(actual.tracking.source).toBe('sms');
    expect(actual.tracking.campaign).toBe('summer_promo');
    expect(actual.tracking.visits).toBe(1);
  });

  it('should handle updateBranding', () => {
    const actual = funnelReducer(initialState as any, updateBranding({ primaryColor: '#ff0000' }));
    expect(actual.branding.primaryColor).toBe('#ff0000');
    expect(actual.branding.tone).toBe('friendly'); // preserved
  });
});
