import { configureStore } from '@reduxjs/toolkit'
import authReducer from './store/slices/authSlice'
import funnelReducer from './store/slices/funnelSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    funnel: funnelReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch