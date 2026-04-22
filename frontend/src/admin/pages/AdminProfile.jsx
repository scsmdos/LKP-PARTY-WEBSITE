import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import { updateAdminProfile, changeAdminPassword } from '../../api/adminApi';

export default function AdminProfile() {
  const { admin, fetchMe } = useAdminAuth();

  // Profile State
  const [profileData, setProfileData] = useState({
    name: admin?.name || '',
    email: admin?.email || '',
  });
  const [profileLoading, setProfileLoading] = useState(false);

  // Password State
  const [passData, setPassData] = useState({
    current_password: '',
    new_password: '',
    new_password_confirmation: '',
  });
  const [passLoading, setPassLoading] = useState(false);

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handlePassChange = (e) => {
    setPassData({ ...passData, [e.target.name]: e.target.value });
  };

  const submitProfile = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    try {
      await updateAdminProfile(profileData);
      toast.success('Profile updated successfully');
      fetchMe(); // refresh Context auth info
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setProfileLoading(false);
    }
  };

  const submitPassword = async (e) => {
    e.preventDefault();
    if (passData.new_password !== passData.new_password_confirmation) {
      return toast.error('Passwords do not match');
    }
    setPassLoading(true);
    try {
      await changeAdminPassword(passData);
      toast.success('Password changed safely');
      setPassData({ current_password: '', new_password: '', new_password_confirmation: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to change password');
    } finally {
      setPassLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Profile Form */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="font-heading font-bold text-lg text-gray-800 mb-2">My Profile</h2>
        <p className="font-body text-xs text-gray-500 mb-6">Update your account's profile information and email address.</p>
        
        <form onSubmit={submitProfile} className="space-y-4 max-w-lg">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
            <input 
              required
              type="text" 
              name="name"
              value={profileData.name}
              onChange={handleProfileChange}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:border-maroon-700 outline-none focus:ring-1 focus:ring-maroon-700 transition"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
            <input 
              required
              type="email" 
              name="email"
              value={profileData.email}
              onChange={handleProfileChange}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:border-maroon-700 outline-none focus:ring-1 focus:ring-maroon-700 transition"
            />
          </div>
          <div className="pt-2">
            <button 
              type="submit" 
              disabled={profileLoading} 
              className="bg-maroon-700 hover:bg-maroon-800 text-white font-semibold text-xs px-5 py-2.5 rounded-md transition-colors disabled:opacity-70"
            >
              {profileLoading ? 'Saving...' : 'Save Profile Changes'}
            </button>
          </div>
        </form>
      </div>

      {/* Password settings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="font-heading font-bold text-lg text-gray-800 mb-2">Update Password</h2>
        <p className="font-body text-xs text-gray-500 mb-6">Ensure your account is using a long, random password to stay secure.</p>
        
        <form onSubmit={submitPassword} className="space-y-4 max-w-lg">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Current Password</label>
            <input 
              required
              type="password" 
              name="current_password"
              value={passData.current_password}
              onChange={handlePassChange}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:border-maroon-700 outline-none focus:ring-1 focus:ring-maroon-700 transition"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">New Password</label>
            <input 
              required
              type="password" 
              name="new_password"
              value={passData.new_password}
              onChange={handlePassChange}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:border-maroon-700 outline-none focus:ring-1 focus:ring-maroon-700 transition"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Confirm New Password</label>
            <input 
              required
              type="password" 
              name="new_password_confirmation"
              value={passData.new_password_confirmation}
              onChange={handlePassChange}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:border-maroon-700 outline-none focus:ring-1 focus:ring-maroon-700 transition"
            />
          </div>
          <div className="pt-2">
            <button 
              type="submit" 
              disabled={passLoading} 
              className="bg-gray-800 hover:bg-gray-900 text-white font-semibold text-xs px-5 py-2.5 rounded-md transition-colors disabled:opacity-70"
            >
              {passLoading ? 'Saving...' : 'Update Password'}
            </button>
          </div>
        </form>
      </div>

    </div>
  )
}
