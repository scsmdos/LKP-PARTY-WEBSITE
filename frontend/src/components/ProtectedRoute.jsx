import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useAdminAuth } from '../contexts/AdminAuthContext';

// ── Member Protected Route ────────────────────────────────────────────────────
export function MemberRoute({ children }) {
  const { member, loading } = useAuth();
  const location = useLocation();

  if (loading) return <FullPageSpinner />;
  if (!member) return <Navigate to="/member/login" state={{ from: location }} replace />;
  return children;
}

// ── Admin Protected Route ─────────────────────────────────────────────────────
export function AdminRoute({ children }) {
  const { admin, loading } = useAdminAuth();
  const location = useLocation();

  if (loading) return <FullPageSpinner />;
  if (!admin) return <Navigate to="/admin/login" state={{ from: location }} replace />;
  return children;
}

// ── Spinner ───────────────────────────────────────────────────────────────────
function FullPageSpinner() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#fcfcfc]">
      <div className="w-10 h-10 border-4 border-maroon-100 border-t-maroon-700 rounded-full animate-spin" />
    </div>
  );
}
