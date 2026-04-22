import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getMe, logoutApi } from '../api/memberApi';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [member, setMember]   = useState(null);
  const [loading, setLoading] = useState(true);

  // Load member from token on mount
  useEffect(() => {
    const token = localStorage.getItem('member_token');
    if (!token) { setLoading(false); return; }
    getMe()
      .then((res) => setMember(res.data.data))
      .catch(() => localStorage.removeItem('member_token'))
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback((token, memberData) => {
    localStorage.setItem('member_token', token);
    setMember(memberData);
  }, []);

  const logout = useCallback(async () => {
    try { await logoutApi(); } catch (_) { /* ignore */ }
    localStorage.removeItem('member_token');
    setMember(null);
  }, []);

  const refreshMember = useCallback(() => {
    return getMe().then((res) => setMember(res.data.data));
  }, []);

  return (
    <AuthContext.Provider value={{ member, loading, login, logout, refreshMember }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
