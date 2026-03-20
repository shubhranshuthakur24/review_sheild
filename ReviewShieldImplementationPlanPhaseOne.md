# Review Shield Phase 1 UI Implementation Plan (Redux Toolkit)

## Overview

This plan outlines the frontend (React) implementation for Phase 1 of Review Shield, focusing on:
- Public Review Funnel System (with UTM tracking & compliance)
- Business Dashboard (Review Inbox, Replies, Alerts, Sync Status, Funnel Builder)
- Authentication and API integration

**Key Decision:** All state management is handled exclusively with Redux Toolkit (no Zustand).

---

## Tech Stack

- **Framework:** React with Vite
- **Styling:** TailwindCSS
- **State Management:** Redux Toolkit (replacing Zustand)
- **HTTP Client:** Axios
- **Routing:** React Router v6
- **Build Tool:** Vite

---

## Phase 1 UI Components Breakdown

### 1. Public Funnel (Customer-Facing)

Accessed via `/r/{slug}` — no authentication required.

#### Pages

| Page | Route | Description |
|------|-------|-------------|
| `FunnelLandingPage` | `/r/:slug` | Business branding, welcome message, CTA to rate |
| `FunnelRatingPage` | `/r/:slug/rate` | ⭐ Star rating selection UI (1-5) |
| `FunnelRoutingPage` | `/r/:slug/route` | Smart routing based on rating score |
| `FunnelRedirectPage` | `/r/:slug/redirect` | Platform selection & redirect (Google, Facebook, Trustpilot, Zomato, Practo) |
| `FunnelFeedbackPage` | `/r/:slug/feedback` | Private feedback form (message, category, contact, attachment) |
| `FunnelThankYouPage` | `/r/:slug/thank-you` | Confirmation after redirect or feedback submit |

#### Components

| Component | Purpose |
|-----------|---------|
| `StarRating` | Interactive 5-star rating selector |
| `PlatformButtons` | Grid of platform buttons (Google, Facebook, Trustpilot, Zomato, Practo) with icons |
| `FeedbackForm` | Private feedback form with category selector, message input, file attachment |
| `CategorySelector` | Dropdown/chips for: `staff`, `pricing`, `service`, `delay`, `cleanliness` |
| `SmartRoutingCTA` | Renders primary/secondary CTAs based on rating (see routing logic below) |
| `BusinessBranding` | Displays business logo, color theme, and welcome message |

#### Smart Routing Logic (Compliance-Safe)

```
IF rating >= 4:
  → Show "Leave a Public Review" CTA (primary)
  → Show "Share Private Feedback" CTA (secondary)

IF rating <= 3:
  → Show "Contact Support / Share Feedback" CTA (primary)
  → Show "Leave a Public Review" CTA (secondary)

⚠️ IMPORTANT: The public review option must ALWAYS be visible regardless
of rating. This avoids review gating, which violates platform policies.
```

#### State Management — `funnelSlice.js`

```js
// store/funnelSlice.js
import { createSlice } from '@reduxjs/toolkit'

const FEEDBACK_CATEGORIES = ['staff', 'pricing', 'service', 'delay', 'cleanliness']

const initialState = {
  businessSlug: '',
  rating: null,
  feedbackData: {
    message: '',
    category: '',       // one of FEEDBACK_CATEGORIES
    contact: null,
    attachment: null
  },
  selectedPlatform: null,
  businessDetails: null,
  // UTM / Campaign Tracking
  utmParams: {
    source: null,       // e.g. 'sms', 'email', 'qr', 'whatsapp', 'nfc', 'web'
    campaign: null,     // e.g. 'promo', 'followup'
    medium: null
  },
  loading: false,
  error: null
}

const funnelSlice = createSlice({
  name: 'funnel',
  initialState,
  reducers: {
    setBusinessSlug: (state, action) => {
      state.businessSlug = action.payload
    },
    setRating: (state, action) => {
      state.rating = action.payload
    },
    setFeedbackData: (state, action) => {
      state.feedbackData = { ...state.feedbackData, ...action.payload }
    },
    setSelectedPlatform: (state, action) => {
      state.selectedPlatform = action.payload
    },
    setBusinessDetails: (state, action) => {
      state.businessDetails = action.payload
    },
    setUtmParams: (state, action) => {
      state.utmParams = { ...state.utmParams, ...action.payload }
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    resetFunnel: () => initialState
  }
})

export const CATEGORIES = FEEDBACK_CATEGORIES

export const {
  setBusinessSlug,
  setRating,
  setFeedbackData,
  setSelectedPlatform,
  setBusinessDetails,
  setUtmParams,
  setLoading,
  setError,
  resetFunnel
} = funnelSlice.actions

export default funnelSlice.reducer
```

#### Usage Example — Rating Page

```jsx
import { useSelector, useDispatch } from 'react-redux'
import { setRating, setFeedbackData } from '../store/funnelSlice'

const FunnelRatingPage = () => {
  const dispatch = useDispatch()
  const rating = useSelector(state => state.funnel.rating)

  const handleRatingChange = (newRating) => {
    dispatch(setRating(newRating))
  }

  // ... rest of component
}
```

#### UTM Parsing (on funnel entry)

```jsx
// In FunnelLandingPage or a useEffect in the funnel layout
import { useSearchParams } from 'react-router-dom'
import { setUtmParams } from '../store/funnelSlice'

const [searchParams] = useSearchParams()
dispatch(setUtmParams({
  source: searchParams.get('source'),
  campaign: searchParams.get('campaign'),
  medium: searchParams.get('medium')
}))
```

---

### 2. Business Dashboard (Authenticated)

Protected routes — requires Laravel Sanctum authentication.

#### State Management — `authSlice.js`

```js
// store/authSlice.js
import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true
      state.error = null
    },
    loginSuccess: (state, action) => {
      state.loading = false
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
    },
    loginFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
    }
  }
})

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions
export default authSlice.reducer
```

#### State Management — `reviewsSlice.js` (with Bulk Actions & Sentiment)

```js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'
import axios from '../lib/axios'

// Async Thunks
export const fetchReviews = createAsyncThunk(
  'reviews/fetchReviews',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/reviews', { params: filters })
      return response.data
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to fetch reviews')
    }
  }
)

export const submitReply = createAsyncThunk(
  'reviews/submitReply',
  async ({ reviewId, replyText, tone }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/reviews/reply', {
        review_id: reviewId,
        response_text: replyText,
        tone
      })
      return response.data
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to submit reply')
    }
  }
)

export const bulkReplyReviews = createAsyncThunk(
  'reviews/bulkReply',
  async ({ reviewIds, replyText, tone }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/reviews/bulk-reply', {
        review_ids: reviewIds,
        response_text: replyText,
        tone
      })
      return response.data
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Bulk reply failed')
    }
  }
)

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: {
    reviews: [],
    filters: {
      platform: null,     // 'google' | 'facebook' | 'trustpilot' | etc.
      rating: null,       // 1-5
      sentiment: null,    // 'positive' | 'neutral' | 'negative'
      location: null,
      replied: null,      // true | false | null (all)
      dateRange: null
    },
    pagination: { page: 1, perPage: 20, total: 0 },
    // Bulk selection
    selectedReviewIds: [],
    selectAll: false,
    // Status
    loading: false,
    error: null
  },
  reducers: {
    updateFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
      state.pagination.page = 1  // reset to page 1 on filter change
    },
    setPage: (state, action) => {
      state.pagination.page = action.payload
    },
    // Bulk selection
    toggleReviewSelection: (state, action) => {
      const id = action.payload
      const idx = state.selectedReviewIds.indexOf(id)
      if (idx >= 0) {
        state.selectedReviewIds.splice(idx, 1)
      } else {
        state.selectedReviewIds.push(id)
      }
    },
    selectAllReviews: (state) => {
      state.selectAll = true
      state.selectedReviewIds = state.reviews.map(r => r.id)
    },
    clearSelection: (state) => {
      state.selectAll = false
      state.selectedReviewIds = []
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false
        state.reviews = action.payload.reviews
        state.pagination = action.payload.pagination
        state.selectedReviewIds = []
        state.selectAll = false
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(submitReply.fulfilled, (state, action) => {
        const updated = action.payload.review
        const idx = state.reviews.findIndex(r => r.id === updated.id)
        if (idx >= 0) state.reviews[idx] = updated
      })
  }
})

// Memoized Selectors
export const selectFilteredReviewCount = createSelector(
  (state) => state.reviews.reviews,
  (reviews) => reviews.length
)

export const selectUnrepliedCount = createSelector(
  (state) => state.reviews.reviews,
  (reviews) => reviews.filter(r => !r.replied).length
)

export const selectSelectedCount = createSelector(
  (state) => state.reviews.selectedReviewIds,
  (ids) => ids.length
)

export const {
  updateFilter,
  setPage,
  toggleReviewSelection,
  selectAllReviews,
  clearSelection
} = reviewsSlice.actions

export default reviewsSlice.reducer
```

#### Usage Example — Review Inbox

```jsx
import { useSelector, useDispatch } from 'react-redux'
import { fetchReviews, updateFilter, selectUnrepliedCount } from '../store/reviewsSlice'

const ReviewInboxPage = () => {
  const dispatch = useDispatch()
  const { reviews, loading, error, filters, selectedReviewIds } = useSelector(state => state.reviews)
  const unrepliedCount = useSelector(selectUnrepliedCount)

  useEffect(() => {
    dispatch(fetchReviews(filters))
  }, [dispatch, filters])

  // ... rest of component with bulk action toolbar, filter bar, table, etc.
}
```

#### State Management — `alertsSlice.js` (with Notification Channels)

```js
// store/alertsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../lib/axios'

export const fetchAlerts = createAsyncThunk(
  'alerts/fetchAlerts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/alerts')
      return response.data
    } catch (err) {
      return rejectWithValue(err.response?.data)
    }
  }
)

export const updateNotificationPrefs = createAsyncThunk(
  'alerts/updateNotificationPrefs',
  async (prefs, { rejectWithValue }) => {
    try {
      const response = await axios.put('/api/settings/notifications', prefs)
      return response.data
    } catch (err) {
      return rejectWithValue(err.response?.data)
    }
  }
)

const alertsSlice = createSlice({
  name: 'alerts',
  initialState: {
    alerts: [],
    unreadCount: 0,
    loading: false,
    error: null,
    // Notification channel preferences
    notificationPrefs: {
      email: true,
      whatsapp: false,
      push: false,
      // Rule-level settings
      urgentReview: true,       // rating <= 3
      noReplyReminder: true,    // no reply in 24h
      reviewSpike: true         // unusual volume
    }
  },
  reducers: {
    markAlertRead: (state, action) => {
      const alert = state.alerts.find(a => a.id === action.payload)
      if (alert) {
        alert.read = true
        state.unreadCount = state.alerts.filter(a => !a.read).length
      }
    },
    setNotificationPrefs: (state, action) => {
      state.notificationPrefs = { ...state.notificationPrefs, ...action.payload }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlerts.pending, (state) => { state.loading = true })
      .addCase(fetchAlerts.fulfilled, (state, action) => {
        state.loading = false
        state.alerts = action.payload.alerts
        state.unreadCount = action.payload.alerts.filter(a => !a.read).length
      })
      .addCase(fetchAlerts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(updateNotificationPrefs.fulfilled, (state, action) => {
        state.notificationPrefs = action.payload.preferences
      })
  }
})

export const { markAlertRead, setNotificationPrefs } = alertsSlice.actions
export default alertsSlice.reducer
```

#### State Management — `syncSlice.js` (Google Sync Status)

```js
// store/syncSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../lib/axios'

export const fetchSyncStatus = createAsyncThunk(
  'sync/fetchStatus',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/sync/status')
      return response.data
    } catch (err) {
      return rejectWithValue(err.response?.data)
    }
  }
)

export const triggerManualSync = createAsyncThunk(
  'sync/triggerManual',
  async (platform, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/sync/${platform}`)
      return response.data
    } catch (err) {
      return rejectWithValue(err.response?.data)
    }
  }
)

const syncSlice = createSlice({
  name: 'sync',
  initialState: {
    google: {
      connected: false,
      lastSyncAt: null,
      status: 'idle',     // 'idle' | 'syncing' | 'error'
      reviewCount: 0,
      error: null
    },
    facebook: {
      connected: false,
      lastSyncAt: null,
      status: 'idle',
      reviewCount: 0,
      error: null
    }
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSyncStatus.fulfilled, (state, action) => {
        if (action.payload.google) state.google = action.payload.google
        if (action.payload.facebook) state.facebook = action.payload.facebook
      })
      .addCase(triggerManualSync.pending, (state, action) => {
        const platform = action.meta.arg
        if (state[platform]) state[platform].status = 'syncing'
      })
      .addCase(triggerManualSync.fulfilled, (state, action) => {
        const platform = action.meta.arg
        if (state[platform]) {
          state[platform].status = 'idle'
          state[platform].lastSyncAt = new Date().toISOString()
        }
      })
      .addCase(triggerManualSync.rejected, (state, action) => {
        const platform = action.meta.arg
        if (state[platform]) {
          state[platform].status = 'error'
          state[platform].error = action.payload
        }
      })
  }
})

export default syncSlice.reducer
```

#### State Management — Additional Slices (unchanged structure)

- **`funnelSettingsSlice.js`** — Dashboard funnel customization (logo, color theme, tone, CTA text)
- **`analyticsSlice.js`** — Funnel & review metrics (conversion rate, rating distribution, redirect CTR, feedback %, avg rating growth, response time, sentiment trend)

---

### 3. Recovery Workflow UI (Phase 1 — Basic)

The dashboard includes a basic recovery status view for negative reviews:

| Step | UI Element | Description |
|------|-----------|-------------|
| 1. Detect | Auto-flagged in Inbox | Reviews with rating ≤ 3 tagged as "Needs Recovery" |
| 2. Outreach | Action button on ReviewDetail | "Send Private Outreach" triggers email/WhatsApp |
| 3. Resolve | Status update dropdown | Mark as "In Progress" → "Resolved" |
| 4. Request Update | Follow-up button | "Request Review Update" sends polite follow-up |

Recovery status is tracked per-review in the `reviewsSlice` via a `recoveryStatus` field (`null | 'flagged' | 'outreach_sent' | 'in_progress' | 'resolved' | 'update_requested'`).

---

## Redux Store Configuration

```js
// store/index.js
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import funnelReducer from './funnelSlice'
import reviewsReducer from './reviewsSlice'
import alertsReducer from './alertsSlice'
import syncReducer from './syncSlice'
import funnelSettingsReducer from './funnelSettingsSlice'
import analyticsReducer from './analyticsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    funnel: funnelReducer,
    reviews: reviewsReducer,
    alerts: alertsReducer,
    sync: syncReducer,
    funnelSettings: funnelSettingsReducer,
    analytics: analyticsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Only ignore specific paths that may contain Date objects
        ignoredPaths: ['sync.google.lastSyncAt', 'sync.facebook.lastSyncAt']
      }
    }),
})
```

### Provider Setup

```jsx
// main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
```

---

## Implementation Phases

### Phase 1A: Project Setup & Authentication (Days 1–2)

1. Initialize React + Vite project
2. Configure TailwindCSS
3. Set up React Router v6
4. Install Redux Toolkit and React-Redux:
   ```
   npm install @reduxjs/toolkit react-redux
   ```
5. Configure Redux store with all slices and middleware
6. Create `authSlice` and implement login/logout logic
7. Set up Axios instance with auth interceptors
8. Create protected route wrapper using Redux auth state
9. Create login/logout pages connected to Redux auth state

### Phase 1B: Public Funnel Implementation (Days 3–5)

1. Create funnel routes: `/r/:slug`, `/r/:slug/rate`, `/r/:slug/route`, `/r/:slug/feedback`, `/r/:slug/thank-you`
2. Create `funnelSlice` with UTM params and feedback categories
3. Implement `BusinessBranding` component (logo, color theme, welcome message)
4. Implement `StarRating` component (interactive 5-star selector)
5. Build `SmartRoutingCTA` with compliance-safe logic (public review always visible)
6. Build `PlatformButtons` (Google, Facebook, Trustpilot, Zomato, Practo)
7. Build `FeedbackForm` with `CategorySelector` (staff, pricing, service, delay, cleanliness)
8. Parse and store UTM params on funnel entry (`?source=`, `?campaign=`, `?medium=`)
9. Connect all components to Redux state using `useSelector`/`useDispatch`
10. Implement API calls via thunk actions for funnel endpoints
11. Add form validation and submission handling
12. Test funnel flow end-to-end

### Phase 1C: Dashboard Core — Inbox & Replies (Days 6–9)

1. Create dashboard layout (sidebar + topbar)
2. Create `reviewsSlice` with:
   - reviews array
   - filters (platform, rating, **sentiment**, location, replied, dateRange)
   - pagination state
   - **bulk selection state** (selectedReviewIds, selectAll)
   - loading/error states
   - **recoveryStatus** per review
3. Implement `ReviewInboxPage` with filter bar and review table
4. Build `ReviewTable` with sorting, pagination, and **bulk selection checkboxes**
5. Add **bulk action toolbar** (bulk reply, bulk mark as read)
6. Create `ReviewDetailPage` with reply editor and **recovery workflow actions**
7. Create thunk actions for fetching reviews, submitting replies, and bulk operations
8. Add inline reply editor with template and tone modes (professional, empathetic, premium, casual)
9. Implement memoized selectors (`createSelector`) for unreplied count, filtered count
10. Test review management flow

### Phase 1D: Dashboard Extensions — Sync, Funnel Builder & Analytics (Days 10–12)

1. **Create `syncSlice` with Google/Facebook connection status and manual sync trigger**
2. Build **Sync Status UI** showing connection state, last sync time, and sync button
3. Create `FunnelBuilderPage` with settings form (logo, color, tone, CTA text)
4. Create `funnelSettingsSlice` for dashboard funnel customization
5. Build `AnalyticsPage` with metric cards and charts
6. Create `analyticsSlice` for funnel metrics (conversion rate, rating distribution, redirect CTR) and review metrics (avg rating, response time, sentiment trend)
7. Create reusable `MetricCard` and `Chart` components
8. Connect to analytics API endpoints via thunks
9. Add preview functionality for funnel settings
10. Test funnel customization and sync flows

### Phase 1E: Alerts, Notifications & Settings (Days 13–14)

1. Implement `AlertsPage` with alert list and unread badge
2. Create `alertsSlice` with:
   - alerts array and unreadCount
   - **notification channel preferences** (email, WhatsApp, push)
   - **rule-level toggles** (urgent review, no-reply reminder, review spike)
3. Build alert rules display (rating ≤3 → urgent, no reply 24h → reminder, spike → alert)
4. Create `SettingsPage` with:
   - **Notification Preferences** — channel toggles (email ✅, WhatsApp, push)
   - **Integration settings** — Google setup flow (placeholder for Phase 2 OAuth)
   - **Profile settings**
5. Implement `updateNotificationPrefs` thunk for saving preferences
6. Test alerts, notification preferences, and settings flows

### Phase 1F: Polish & Testing (Day 15)

1. Responsive design adjustments
2. Loading states and error handling (using Redux state)
3. Form validation improvements
4. Accessibility checks (ARIA labels, keyboard navigation)
5. Performance optimization (memoized selectors, `React.memo` where needed)
6. Cross-browser testing
7. Final QA and bug fixing

---

## Dependencies

```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^7.1.0",
    "@reduxjs/toolkit": "^2.5.0",
    "react-redux": "^9.2.0",
    "reselect": "^5.1.0",
    "axios": "^1.8.0",
    "date-fns": "^4.1.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.0",
    "vite": "^6.2.0",
    "tailwindcss": "^4.0.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.5.0"
  }
}
```

> **Note:** `reselect` is included with `@reduxjs/toolkit` but listed explicitly for clarity. `@reduxjs/toolkit` v2 includes breaking changes from v1 — see [migration guide](https://redux-toolkit.js.org/migration/migrating-1.x-to-2.x).

---

## Success Criteria

All success criteria are implemented with Redux Toolkit, verified through:
- Redux DevTools showing correct state transitions
- Components properly subscribing to state changes via `useSelector`
- Actions dispatched correctly via `useDispatch`
- Async thunks handling loading/error states appropriately
- Memoized selectors (`createSelector`) used for derived/filtered data
- Bulk actions working correctly in the review inbox
- UTM parameters captured and sent with funnel API calls
- Smart routing logic respects compliance (public review always visible)
- Google sync status visible in dashboard
- Notification channel preferences saveable and loading correctly
- No Zustand usage anywhere in the codebase

---

This plan implements all Phase 1 scope from the product documentation (funnel system, Google sync, inbox, replies, alerts) using Redux Toolkit with slice-based organization, async thunks, and memoized selectors for optimal performance.