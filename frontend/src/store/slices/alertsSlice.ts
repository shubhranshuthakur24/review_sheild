import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AlertType = 'URGENT' | 'REPLY_REMINDER' | 'REVIEW_SPIKE';
export type AlertStatus = 'pending' | 'resolved' | 'dismissed';

export interface Alert {
  id: string;
  type: AlertType;
  reviewId: string;
  message: string;
  status: AlertStatus;
  timestamp: string;
}

interface AlertsState {
  items: Alert[];
  rules: {
    urgentThreshold: number; // e.g., 3
    reminderHours: number; // e.g., 24
  };
}

const initialState: AlertsState = {
  items: [
    {
      id: 'alt-1',
      type: 'URGENT',
      reviewId: 'rev-2',
      message: 'Urgent: 2-star review received from Sarah Jenkins on Facebook.',
      status: 'pending',
      timestamp: '2024-03-22T09:20:00Z'
    }
  ],
  rules: {
    urgentThreshold: 3,
    reminderHours: 24
  }
};

const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    addAlert: (state, action: PayloadAction<Alert>) => {
      state.items.unshift(action.payload);
    },
    updateAlertStatus: (state, action: PayloadAction<{ id: string; status: AlertStatus }>) => {
      const alert = state.items.find(a => a.id === action.payload.id);
      if (alert) {
        alert.status = action.payload.status;
      }
    },
    setAlertRules: (state, action: PayloadAction<AlertsState['rules']>) => {
      state.rules = action.payload;
    }
  }
});

export const { addAlert, updateAlertStatus, setAlertRules } = alertsSlice.actions;
export default alertsSlice.reducer;
