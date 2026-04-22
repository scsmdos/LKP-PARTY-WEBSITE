import { adminApi } from './axios';

// ── Auth & Profile ─────────────────────────────────────────────────────────────
export const adminLogin          = (data) => adminApi.post('/admin/login', data);
export const adminLogout         = ()     => adminApi.post('/admin/logout');
export const getAdminMe          = ()     => adminApi.get('/admin/me');
export const updateAdminProfile  = (data) => adminApi.put('/admin/profile', data);
export const changeAdminPassword = (data) => adminApi.put('/admin/password', data);

// ── Stats ─────────────────────────────────────────────────────────────────────
export const getOverview  = ()             => adminApi.get('/admin/stats/overview');
export const getByState   = ()             => adminApi.get('/admin/stats/by-state');
export const getGrowth    = ()             => adminApi.get('/admin/stats/growth');

// ── Members ──────────────────────────────────────────────────────────────────
export const getMembers       = (params)   => adminApi.get('/admin/members', { params });
export const getMemberDetail  = (id)       => adminApi.get(`/admin/members/${id}`);
export const updateStatus     = (id, status) => adminApi.put(`/admin/members/${id}/status`, { status });
export const exportMembers    = (params)   => adminApi.get('/admin/members/export', { params, responseType: 'blob' });

// ── Locations (Dynamic filters based on member data) ─────────────────────────
export const getFilterOptions = (type, params = {}) => adminApi.get('/admin/filters', { params: { type, ...params } });

