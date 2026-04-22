import { memberApi } from './axios';

// ── Auth ─────────────────────────────────────────────────────────────────────
export const sendOtp    = (mobile)                => memberApi.post('/auth/send-otp', { mobile });
export const verifyOtp  = (mobile, otp, referralCode) => memberApi.post('/auth/verify-otp', { mobile, otp, referral_code: referralCode || undefined });
export const verifyFirebase = (token, referralCode) => memberApi.post('/auth/verify-firebase', { firebase_token: token, referral_code: referralCode || undefined });
export const logoutApi  = ()                      => memberApi.post('/auth/logout');
export const getMe      = ()                      => memberApi.get('/auth/me');

// ── Profile ───────────────────────────────────────────────────────────────────
export const savePersonal   = (data)     => memberApi.put('/member/personal', data);
export const getLocation    = ()         => memberApi.get('/member/location');
export const saveLocation   = (data)     => memberApi.put('/member/location', data);
export const uploadPhoto    = (file)     => {
  const form = new FormData();
  form.append('photo', file);
  return memberApi.post('/member/photo', form, { headers: { 'Content-Type': 'multipart/form-data' } });
};

// ── Family ────────────────────────────────────────────────────────────────────
export const getFamily      = ()         => memberApi.get('/member/family');
export const addFamily      = (data)     => memberApi.post('/member/family', data);
export const updateFamily   = (id, data) => memberApi.put(`/member/family/${id}`, data);
export const deleteFamily   = (id)       => memberApi.delete(`/member/family/${id}`);

// ── Social ────────────────────────────────────────────────────────────────────
export const getSocial      = ()         => memberApi.get('/member/social');
export const saveSocial     = (data)     => memberApi.put('/member/social', data);

// ── Card ──────────────────────────────────────────────────────────────────────
export const getCard        = ()         => memberApi.get('/member/card');

// ── Referral ──────────────────────────────────────────────────────────────────
export const getReferral    = ()         => memberApi.get('/member/referral');

// ── Locations (cascading dropdowns) ──────────────────────────────────────────
export const getDistricts   = (state)    => memberApi.get(`/locations/districts?state=${state}`);
export const getBlocks      = (dist)     => memberApi.get(`/locations/blocks?district=${dist}`);

