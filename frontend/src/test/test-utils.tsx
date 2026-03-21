import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import authReducer from '../store/slices/authSlice';
import funnelReducer from '../store/slices/funnelSlice';
import reviewsReducer from '../store/slices/reviewsSlice';
import alertsReducer from '../store/slices/alertsSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  funnel: funnelReducer,
  reviews: reviewsReducer,
  alerts: alertsReducer,
});

// Default preloaded state to ensure tests don't crash on missing state
const defaultPreloadedState = {
  alerts: {
    items: [],
    rules: { urgentThreshold: 3, reminderHours: 24 }
  },
  funnel: {
    currentStep: 'landing',
    rating: null,
    branding: { primaryColor: '#6366f1', tone: 'friendly', ctaText: 'Share My Experience' },
    tracking: { source: null, campaign: null, visits: 0, conversions: 0 }
  },
  reviews: {
    items: [
      { id: '1', author: 'John Doe', rating: 5, text: 'Great stuff!', platform: 'google', date: new Date().toISOString(), sentiment: 'positive', isReplied: false, location: 'Downtown' }
    ],
    filters: { platform: 'all', rating: 'all', sentiment: 'all', isReplied: 'all', search: '' }
  }
};

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: any;
  store?: any;
}

export function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState = {},
    store = configureStore({
      reducer: rootReducer,
      preloadedState: { ...defaultPreloadedState, ...preloadedState },
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }): ReactElement {
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
