import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiMapPin, FiUsers, FiShare2, FiCreditCard, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';

const SECTIONS = [
  { key: 'personal', label: 'Personal Info',    icon: FiUser,       to: '/member/profile' },
  { key: 'location', label: 'Location Details', icon: FiMapPin,     to: '/member/location' },
  { key: 'family',   label: 'Family Members',   icon: FiUsers,      to: '/member/family' },
  { key: 'social',   label: 'Social Media',     icon: FiShare2,     to: '/member/social' },
  { key: 'card',     label: 'Membership Card',  icon: FiCreditCard, to: '/member/card' },
];

export default function MemberDashboard() {
  const { member } = useAuth();

  // Calculate profile completion
  const isPersonalDone = !!(
    member?.full_name && 
    member?.dob && 
    member?.gender && 
    member?.occupation && 
    member?.email && 
    member?.voter_id && 
    member?.photo_url
  );

  const completion = [
    isPersonalDone,
    !!(member?.state && member?.district),
    !!(member?.family_members_count > 0),
    !!(member?.social_profiles_count > 0),
  ];
  const completedCount = completion.filter(Boolean).length;
  const percentage = Math.round((completedCount / completion.length) * 100);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Profile Completion */}
      <div className="bg-white border border-gray-100 p-6 shadow-sm rounded-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-sm font-bold text-gray-700">Profile Completion</h2>
          <span className="font-heading font-black text-maroon-700 text-lg">{percentage}%</span>
        </div>
        <div className="h-2.5 bg-gray-100 w-full rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-maroon-700 to-maroon-500 transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(122,0,0,0.2)]"
            style={{ width: `${percentage}%` }}
          />
        </div>
        {percentage < 100 && (
          <p className="text-xs text-gray-400 font-medium font-body mt-3 bg-gray-50 p-2 rounded-lg inline-block border border-gray-100">
             Complete your profile to generate your Membership Card
          </p>
        )}
      </div>

      {/* Quick Links Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {SECTIONS.map(({ key, label, icon: Icon, to }) => {
          const done = key === 'personal' ? isPersonalDone
                     : key === 'location' ? !!(member?.state && member?.district)
                     : key === 'family'   ? !!(member?.family_members_count > 0)
                     : key === 'social'   ? !!(member?.social_profiles_count > 0)
                     : key === 'card'     ? percentage === 100
                     : false;
          return (
            <Link
              key={key}
              to={to}
              className="bg-white border border-gray-100 p-5 shadow-sm rounded-2xl hover:border-maroon-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex items-start gap-4 ring-1 ring-black/5"
            >
              <div className="w-12 h-12 bg-maroon-50 rounded-xl flex items-center justify-center group-hover:bg-maroon-100 transition-colors shrink-0">
                <Icon className="text-maroon-700" size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-heading font-bold text-sm text-gray-800 tracking-tight">{label}</p>
                <p className={`text-[11px] font-bold font-body mt-1 uppercase tracking-wider ${done ? 'text-green-600' : 'text-amber-500'}`}>
                  {done ? 'Completed' : 'Incomplete'}
                </p>
              </div>
              {done
                ? <FiCheckCircle className="text-green-500 shrink-0 mt-0.5" size={18} />
                : <FiAlertCircle className="text-amber-400 shrink-0 mt-0.5" size={18} />
              }
            </Link>
          );
        })}
      </div>

      {/* Status Badge */}
      <div className="bg-white border border-gray-100 p-5 shadow-sm rounded-2xl flex items-center gap-4 border-l-4 border-l-maroon-700">
        <div className={`w-3 h-3 rounded-full animate-pulse ${member?.status === 'active' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]'}`} />
        <p className="text-sm font-medium font-body text-gray-700">
          Membership Status:{' '}
          <span className={`font-bold ml-1 px-2 py-0.5 rounded text-xs uppercase ${member?.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
            {member?.status === 'active' ? 'Active' : 'Pending Approval'}
          </span>
        </p>
      </div>
    </div>
  );
}
