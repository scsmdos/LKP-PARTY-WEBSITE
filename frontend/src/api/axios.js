import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// ── Member API Instance ──────────────────────────────────────────────────────
const memberApi = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
});

memberApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('member_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

memberApi.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('member_token');
      window.location.href = '/member/login';
    }
    return Promise.reject(err);
  }
);

// ── Admin API Instance ───────────────────────────────────────────────────────
const adminApi = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
});

adminApi.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('admin_token'); // sessionStorage: clears on tab close
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

adminApi.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      sessionStorage.removeItem('admin_token');
      window.location.href = '/admin/login';
    }
    return Promise.reject(err);
  }
);

export { memberApi, adminApi };
