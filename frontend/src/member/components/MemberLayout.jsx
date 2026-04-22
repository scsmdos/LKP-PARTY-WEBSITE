import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  FiHome, FiUser, FiMapPin, FiUsers, FiShare2, FiCreditCard,
  FiLogOut, FiMenu, FiX, FiGift,
} from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import logo from '../../assets/logo.png';
import logoText from '../../assets/footer-text-logo.png';

const NAV_ITEMS = [
  { to: '/member/dashboard',  label: 'Overview',         icon: FiHome },
  { to: '/member/profile',    label: 'Personal Info',    icon: FiUser },
  { to: '/member/location',   label: 'Location',         icon: FiMapPin },
  { to: '/member/family',     label: 'Family Members',   icon: FiUsers },
  { to: '/member/social',     label: 'Social Media',     icon: FiShare2 },
  { to: '/member/card',       label: 'Membership Card',  icon: FiCreditCard },
  { to: '/member/refer',      label: 'Refer',            icon: FiGift },
];

export default function MemberLayout() {
  const { member, logout }  = useAuth();
  const navigate            = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
    navigate('/member/login');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex overflow-x-hidden">
      {/* ── Sidebar ── */}
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-opacity lg:hidden" 
          onClick={() => setSidebarOpen(false)} 
        />
      )}

      {/* Profile Overlay (Invisible backdrop to close dropdown) */}
      {profileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-transparent" 
          onClick={() => setProfileOpen(false)} 
        />
      )}

      <aside className={`
        fixed top-0 left-0 h-screen z-[70] w-64 bg-maroon-700 flex flex-col shadow-2xl
        transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:sticky lg:top-0 lg:z-auto lg:shrink-0
      `}>
        {/* Sidebar Logo Section */}
        <div className="h-14 flex items-center px-4 border-b border-white/10 shrink-0 relative">
          <div className="flex items-center gap-2">
             <div className="bg-white rounded-full p-0.5 shadow-sm">
                <img src={logo} alt="LKP Logo" className="h-6 w-6 object-contain" />
             </div>
             <img src={logoText} alt="LKP Text" className="h-11 object-contain brightness-0 invert" />
          </div>
          <button onClick={() => setSidebarOpen(false)} className="ml-auto text-white/50 lg:hidden hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-all">
            <FiX size={20} />
          </button>
        </div>

        {/* Sidebar Nav */}
        <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto custom-scrollbar">
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/member/dashboard'}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 text-[0.82rem] font-bold transition-all duration-200 rounded-xl ${
                  isActive
                    ? 'bg-white text-maroon-700 shadow-xl'
                    : 'text-white/60 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Sidebar Bottom Logout */}
        <div className="px-3 py-2 border-t border-white/10 shrink-0">
           <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 text-[0.82rem] font-bold text-white/50 hover:text-white hover:bg-white/10 w-full transition-all rounded-xl"
          >
            <FiLogOut size={16} className="opacity-50" />
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 h-screen">
        {/* Upper Header */}
        <header className="h-16 shrink-0 bg-white border-b border-gray-100 flex items-center justify-between sticky top-0 z-50 shadow-sm px-4 md:px-8">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSidebarOpen(true)} 
              className="lg:hidden p-2 -ml-2 hover:bg-gray-50 rounded-xl text-maroon-700 transition-colors"
            >
              <FiMenu size={24} />
            </button>
            <div className="hidden lg:block">
              <h1 className="text-lg font-heading font-black text-gray-800 tracking-tight">
                Welcome back, <span className="text-maroon-700">{member?.full_name?.split(' ')[0] || 'Member'}!</span>
              </h1>
            </div>
            {/* Mobile Title */}
            {/* Mobile Brand & Name */}
            <div className="lg:hidden flex items-center gap-2">
               <div className="h-10 w-10 flex items-center justify-center shrink-0">
                  <img src={logo} alt="LKP" className="h-9 w-9 object-contain" />
               </div>
               <div className="flex flex-col text-left">
                  <span className="text-[12px] font-black text-maroon-700 uppercase tracking-tighter leading-none">{member?.full_name?.split(' ')[0]}</span>
                  <span className="text-[10px] font-bold text-gray-400 leading-none mt-1 uppercase">LKP Member</span>
               </div>
            </div>
          </div>

          {/* Profile Dropdown Wrapper */}
          <div className="relative">
            <button 
              onClick={() => setProfileOpen(!profileOpen)}
              className={`flex items-center gap-3 border-l border-gray-100 pl-4 h-10 hover:bg-gray-50 -mr-2 pr-2 rounded-xl transition-all group ${profileOpen ? 'bg-gray-50' : ''}`}
            >
              <div className="text-right hidden sm:block">
                <p className="text-xs font-black text-gray-800 leading-none group-hover:text-maroon-700 truncate max-w-[140px] uppercase tracking-tight">{member?.full_name}</p>
                <p className="text-[10px] font-black text-maroon-600 mt-1 uppercase tracking-widest leading-none">{member?.member_id}</p>
              </div>
              <div className="h-9 w-9 rounded-full bg-maroon-50 border-2 border-maroon-100 flex items-center justify-center text-maroon-700 font-bold overflow-hidden shadow-inner group-hover:border-maroon-300 transition-all">
                 {member?.photo_url ? (
                   <img src={member.photo_url} alt="Profile" className="h-full w-full object-cover" />
                 ) : (
                   <FiUser size={18} />
                 )}
              </div>
            </button>

            {/* Actual Dropdown */}
            {profileOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-100 shadow-2xl rounded-2xl py-2 z-50 animate-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-3 border-b border-gray-50 mb-1 lg:hidden">
                    <p className="text-sm font-black text-gray-800 leading-none truncate uppercase tracking-tight">{member?.full_name}</p>
                    <p className="text-[10px] text-maroon-600 font-black mt-1.5 uppercase tracking-widest">{member?.member_id}</p>
                </div>
                <NavLink 
                  to="/member/profile" 
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-maroon-50 hover:text-maroon-700 transition-colors"
                >
                  <FiUser size={18} /> My Profile
                </NavLink>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 w-full text-left transition-colors mt-1"
                >
                  <FiLogOut size={18} /> Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Page Content Scroll Area */}
        <main className="flex-1 overflow-y-auto custom-scrollbar bg-[#F8F9FA] p-4 md:p-8">
          <div className="max-w-7xl mx-auto pb-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
