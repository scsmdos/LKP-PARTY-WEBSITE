import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiLock, FiMail, FiShield } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { adminLogin } from '../../api/adminApi';
import { useAdminAuth } from '../../contexts/AdminAuthContext';

export default function AdminLogin() {
  const { login, admin }  = useAdminAuth();
  const navigate          = useNavigate();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Redirect if already logged in
  React.useEffect(() => {
    if (admin) navigate('/admin/dashboard', { replace: true });
  }, [admin]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await adminLogin(data);
      login(res.data.token, res.data.admin);
      toast.success('Welcome, ' + res.data.admin.name);
      navigate('/admin/dashboard', { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-maroon-700 mx-auto flex items-center justify-center mb-4">
            <FiShield className="text-gold" size={26} />
          </div>
          <h1 className="font-heading text-xl font-bold text-white">Admin Panel</h1>
          <p className="text-white/40 text-xs font-body mt-1">Lok Kalyan Party · Super Admin</p>
        </div>

        <div className="bg-[#242424] border border-white/10 p-7">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-xs font-body text-white/60 mb-1.5">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-3.5 text-white/30" size={14} />
                <input
                  {...register('email', {
                    required: 'Email required',
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Valid email enter करें' },
                  })}
                  type="email"
                  className="w-full bg-[#1a1a1a] border border-white/10 text-white text-sm font-body px-4 py-2.5 pl-9 focus:outline-none focus:border-maroon-500 transition-colors"
                  placeholder="admin@lokkalyanparty.in"
                  autoComplete="email"
                />
              </div>
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-body text-white/60 mb-1.5">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-3.5 text-white/30" size={14} />
                <input
                  {...register('password', { required: 'Password required', minLength: { value: 8, message: '8+ characters' } })}
                  type="password"
                  className="w-full bg-[#1a1a1a] border border-white/10 text-white text-sm font-body px-4 py-2.5 pl-9 focus:outline-none focus:border-maroon-500 transition-colors"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <button type="submit" disabled={loading} className="w-full bg-maroon-700 hover:bg-maroon-600 text-white font-heading font-semibold py-2.5 text-sm transition-colors flex items-center justify-center gap-2">
              {loading ? <Spinner /> : 'Login'}
            </button>
          </form>
        </div>

        <p className="text-center text-white/20 text-xs font-body mt-4">
          Unauthorized access is prohibited
        </p>
      </div>
    </div>
  );
}

function Spinner() {
  return <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />;
}
