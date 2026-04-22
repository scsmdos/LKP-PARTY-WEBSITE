import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getAdminMe, adminLogout } from '../api/adminApi';

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin]     = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem('admin_token'); // sessionStorage: safer for admin
    if (!token) { setLoading(false); return; }
    getAdminMe()
      .then((res) => setAdmin(res.data.data))
      .catch(() => sessionStorage.removeItem('admin_token'))
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback((token, adminData) => {
    sessionStorage.setItem('admin_token', token);
    setAdmin(adminData);
  }, []);

  const logout = useCallback(async () => {
    try { await adminLogout(); } catch (_) { /* ignore */ }
    sessionStorage.removeItem('admin_token');
    setAdmin(null);
  }, []);

  const fetchMe = useCallback(async () => {
    try {
      const res = await getAdminMe();
      setAdmin(res.data.data);
    } catch (err) {
      // If fails, might be session expiry
      if (err.response?.status === 401) {
        sessionStorage.removeItem('admin_token');
        setAdmin(null);
      }
    }
  }, []);

  return (
    <AdminAuthContext.Provider value={{ admin, loading, login, logout, fetchMe }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export const useAdminAuth = () => {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used inside AdminAuthProvider');
  return ctx;
};
