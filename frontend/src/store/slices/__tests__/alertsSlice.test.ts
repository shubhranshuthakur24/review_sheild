import { describe, it, expect } from 'vitest';
import alertsReducer, { addAlert, updateAlertStatus, setAlertRules, Alert } from '../alertsSlice';

describe('alertsSlice', () => {
  const initialState = {
    items: [],
    rules: {
      urgentThreshold: 3,
      reminderHours: 24
    }
  };

  it('should handle addAlert', () => {
    const newAlert: Alert = {
      id: 'test-1',
      type: 'URGENT',
      reviewId: 'rev-1',
      message: 'Test message',
      status: 'pending',
      timestamp: new Date().toISOString()
    };
    const actual = alertsReducer(initialState as any, addAlert(newAlert));
    expect(actual.items).toHaveLength(1);
    expect(actual.items[0].id).toBe('test-1');
  });

  it('should handle updateAlertStatus', () => {
    const stateWithAlert = {
      ...initialState,
      items: [{ id: 'test-1', status: 'pending' }]
    };
    const actual = alertsReducer(stateWithAlert as any, updateAlertStatus({ id: 'test-1', status: 'resolved' }));
    expect(actual.items[0].status).toBe('resolved');
  });

  it('should handle setAlertRules', () => {
    const newRules = { urgentThreshold: 4, reminderHours: 12 };
    const actual = alertsReducer(initialState as any, setAlertRules(newRules));
    expect(actual.rules.urgentThreshold).toBe(4);
    expect(actual.rules.reminderHours).toBe(12);
  });
});
