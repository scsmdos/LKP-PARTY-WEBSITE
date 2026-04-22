import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  FiGrid, FiUsers, FiLogOut, FiMenu, FiX, FiChevronDown, FiUser, FiSettings
} from 'react-icons/fi';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import toast from 'react-hot-toast';
import logo from '../../assets/logo.png';
import footerTextLogo from '../../assets/footer-text-logo.png';

const NAV_ITEMS = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: FiGrid, end: true },
  { to: '/admin/members',   label: 'Members',   icon: FiUsers },
  { to: '/admin/profile',   label: 'Settings',  icon: FiSettings },
];

export default function AdminLayout() {
  const { admin, logout }     = useAdminAuth();
  const navigate              = useNavigate();
  const [openSidebar, setOpenSidebar] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out safely');
    navigate('/admin/login');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-[#f4f6f8] flex font-body">

      {/* Mobile Overlay */}
      {openSidebar && (
        <div className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden transition-opacity" onClick={() => setOpenSidebar(false)} />
      )}

      {/* ── Left Sidebar (Top to Bottom) ───────────────────────────────── */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-56 bg-[#111111] shadow-xl flex flex-col justify-between transition-transform duration-300 ease-in-out ${openSidebar ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        
        <div className="h-16 px-4 bg-[#1a1a1a] shadow-sm border-b border-white/10 flex items-center shrink-0 relative">
            <div className="flex items-center justify-center shrink-0">
              <img src={logo} alt="LKP" className="w-10 h-10 object-contain" />
            </div>
            <span className="text-white font-heading font-black text-lg tracking-tight ml-3">LKP ADMIN</span>
            <button onClick={() => setOpenSidebar(false)} className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-400 lg:hidden p-1 rounded-md hover:bg-white/10">
              <FiX size={18} />
            </button>
        </div>
        
        <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          <p className="px-3 text-[10px] font-bold text-gray-500 tracking-wider uppercase mb-3">Main Menu</p>
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setOpenSidebar(false)}
              className={({ isActive }) =>
                `flex items-center gap-3.5 px-3 py-2.5 text-[13px] font-medium rounded-md transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-maroon-700/80 to-maroon-900/80 text-white shadow-md'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <Icon size={16} className={({ isActive }) => isActive ? 'text-gold' : 'text-gray-400'} /> 
              {label}
            </NavLink>
          ))}
        </div>

        <div className="p-4 border-t border-white/10 shrink-0">
          <button 
            onClick={handleLogout} 
            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-xs text-white bg-white/5 hover:bg-red-500/20 hover:text-red-400 border border-white/10 rounded-md transition-all font-semibold"
          >
            <FiLogOut size={15} /> Logout
          </button>
        </div>
      </aside>

      {/* ── Main Right Area ───────────────────────────────────────────── */}
      <div className="flex-1 lg:ml-56 flex flex-col min-w-0 min-h-screen">
        
        {/* Top Header */}
        <header className="sticky top-0 h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm z-30 flex items-center justify-between px-4 lg:px-6 shrink-0">
          
          <div className="flex items-center gap-2">
            <button onClick={() => setOpenSidebar(true)} className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
              <FiMenu size={22} />
            </button>
            <div className="flex lg:hidden items-center ml-1">
              <img src={logo} alt="LKP" className="w-8 h-8 object-contain" />
            </div>
            <div className="hidden lg:block">
              <span className="text-gray-400 text-xs font-bold tracking-widest uppercase">Welcome back,</span>
              <h2 className="text-sm font-black text-gray-900 -mt-1">{admin?.name || 'Administrator'}</h2>
            </div>
          </div>

          {/* Right: Admin Profile */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2.5 p-1.5 pr-2 hover:bg-gray-50 border border-transparent hover:border-gray-100 rounded-lg transition-all"
            >
              <div className="w-9 h-9 rounded-full bg-maroon-50 border border-maroon-100 flex items-center justify-center text-maroon-700">
                <FiUser size={16} />
              </div>
              <div className="flex flex-col items-start pr-1">
                <span className="text-[11px] md:text-xs font-bold text-gray-800 leading-none">{admin?.name || 'Admin'}</span>
                <span className="hidden md:block text-[10px] text-gray-500 mt-0.5">{admin?.email}</span>
              </div>
              <FiChevronDown size={14} className="text-gray-400" />
            </button>

            {/* Profile Dropdown */}
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-md shadow-lg py-1 z-50 overflow-hidden slide-down">
                <div className="px-4 py-3 border-b border-gray-50 md:hidden">
                  <span className="block text-xs font-bold text-gray-800">{admin?.name || 'Super Admin'}</span>
                  <span className="block text-[10px] text-gray-500 mt-0.5 truncate">{admin?.email}</span>
                </div>
                <button 
                  onClick={() => { setProfileOpen(false); navigate('/admin/profile'); }}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <FiSettings size={14} /> Account Settings
                </button>
                <div className="h-px bg-gray-100 my-1"></div>
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
                >
                  <FiLogOut size={14} /> Logout Session
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 w-full px-4 md:px-10 py-6 overflow-auto">
          <div className="animate-in fade-in slide-in-from-bottom-3 duration-500">
            <Outlet />
          </div>
        </main>
        
      </div>
    </div>
  );
}
