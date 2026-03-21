import { describe, it, expect, beforeEach } from 'vitest';
import authReducer, { loginSuccess, logout } from '../authSlice';

describe('authSlice', () => {
  const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
  };

  beforeEach(() => {
    localStorage.clear();
  });

  it('should handle loginSuccess', () => {
    const user = { id: '1', name: 'Admin', email: 'admin@shield.com', role: 'admin', trialEnds: '2025-01-01' };
    const actual = authReducer(initialState as any, loginSuccess(user));
    
    expect(actual.isAuthenticated).toBe(true);
    expect(actual.user?.name).toBe('Admin');
    expect(localStorage.getItem('user')).toContain('Admin');
  });

  it('should handle logout', () => {
    const loggedInState = { ...initialState, isAuthenticated: true, user: { name: 'Admin' } };
    const actual = authReducer(loggedInState as any, logout());
    
    expect(actual.isAuthenticated).toBe(false);
    expect(actual.user).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();
  });
});
