import { configureStore } from '@reduxjs/toolkit'
import authReducer from './store/slices/authSlice'
import funnelReducer from './store/slices/funnelSlice'
import reviewsReducer from './store/slices/reviewsSlice'
import alertsReducer from './store/slices/alertsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    funnel: funnelReducer,
    reviews: reviewsReducer,
    alerts: alertsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch