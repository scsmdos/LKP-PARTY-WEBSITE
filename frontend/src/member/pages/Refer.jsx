import React, { useEffect, useState } from 'react';
import { FiCopy, FiShare2, FiUsers, FiStar, FiCheckCircle, FiExternalLink } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { getReferral } from '../../api/memberApi';

export default function Refer() {
  const [data, setData]   = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReferral()
      .then((r) => setData(r.data.data))
      .catch(() => toast.error('Failed to load referral data'))
      .finally(() => setLoading(false));
  }, []);

  const copyCode = () => {
    navigator.clipboard.writeText(data.referral_code);
    toast.success('Referral code copied!');
  };

  const referralLink = data ? `${window.location.origin}/ref/${data.referral_code}` : '';

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success('Referral link copied!');
  };

  const shareLink = async () => {
    if (navigator.share) {
      await navigator.share({
        title: 'Join Lok Kalyan Party',
        text: `I'm a member of Lok Kalyan Party! Join using my referral code: ${data.referral_code}`,
        url: referralLink,
      });
    } else {
      copyLink();
    }
  };

  if (loading) return (
    <div className="h-64 flex flex-col items-center justify-center gap-4">
      <div className="w-10 h-10 border-4 border-maroon-100 border-t-maroon-700 rounded-full animate-spin" />
      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Loading Referral Info...</p>
    </div>
  );

  return (
    <div className="w-full space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-maroon-800 via-maroon-700 to-maroon-900 p-6 md:p-8 text-white shadow-xl">
        {/* Decorative circles */}
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/5" />
        <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full bg-white/5" />
        <div className="absolute top-4 right-24 w-16 h-16 rounded-full bg-yellow-400/10" />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <FiStar className="text-yellow-400" size={18} />
              <span className="text-yellow-400 text-xs font-black uppercase tracking-widest">Refer</span>
            </div>
            <h1 className="font-heading text-2xl md:text-3xl lg:text-4xl font-black tracking-tight mb-3 text-white">
              Invite Friends to<br />Lok Kalyan Party
            </h1>
            <p className="text-white/60 text-sm font-body leading-relaxed max-w-md">
              For every successful referral, you will receive <strong className="text-yellow-400">10 Points</strong>.
              Accumulating points will elevate your recognition and grant you the status of a <strong className="text-white">Primary Member</strong> within the party.
            </p>
          </div>

          {/* Points Badge */}
          <div className="mt-2 md:mt-0 shrink-0 inline-flex items-center gap-5 bg-white/10 border border-white/20 rounded-3xl px-8 py-5 backdrop-blur-sm self-start md:self-auto">
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-heading font-black text-yellow-400">{data?.points ?? 0}</p>
              <p className="text-[10px] text-white/50 uppercase tracking-widest font-bold mt-1">Total Points</p>
            </div>
            <div className="h-16 w-px bg-white/20" />
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-heading font-black text-white">{data?.total_referrals ?? 0}</p>
              <p className="text-[10px] text-white/50 uppercase tracking-widest font-bold mt-1">Referrals</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Referral Code & Link */}
        <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 space-y-5">
          <h2 className="font-heading text-sm font-black text-gray-700 uppercase tracking-wider">Your Referral Details</h2>

          {/* Code */}
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Referral Code</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 min-w-0 bg-maroon-50 border-2 border-dashed border-maroon-200 rounded-xl px-4 py-3 font-heading font-black text-maroon-700 text-lg md:text-xl tracking-widest text-center md:text-left truncate">
                {data?.referral_code || '—'}
              </div>
              <button
                onClick={copyCode}
                className="shrink-0 p-3 bg-maroon-700 text-white rounded-xl hover:bg-maroon-800 transition-all active:scale-95 shadow-md"
              >
                <FiCopy size={18} />
              </button>
            </div>
          </div>

          {/* Link */}
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Referral Link</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 min-w-0 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs text-gray-500 font-mono truncate select-all">
                {referralLink || '—'}
              </div>
              <button
                onClick={copyLink}
                className="shrink-0 p-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-all active:scale-95"
              >
                <FiCopy size={16} />
              </button>
            </div>
          </div>

          {/* Share Button */}
          <button
            onClick={shareLink}
            className="w-full flex items-center justify-center gap-3 bg-yellow-500 hover:bg-yellow-400 text-maroon-900 font-heading font-black py-3.5 rounded-xl transition-all shadow-lg active:scale-95 uppercase tracking-widest text-sm"
          >
            <FiShare2 size={18} />
            Share Referral Link
          </button>
        </div>

        {/* How it works */}
        <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6">
          <h2 className="font-heading text-sm font-black text-gray-700 uppercase tracking-wider mb-4">How It Works</h2>
          <div className="space-y-4">
            {[
              { step: '1', title: 'Share Your Code', desc: 'Send your referral code or link to your friends and family.' },
              { step: '2', title: 'Friends Join LKP', desc: 'Your friends use your link to register and complete their profile.' },
              { step: '3', title: 'Become Primary Member', desc: 'Secure 10 points per successful referral and gain primary membership.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-maroon-700 text-white font-heading font-black text-sm flex items-center justify-center shrink-0">
                  {step}
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-800">{title}</p>
                  <p className="text-xs text-gray-500 font-body mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Referred Members List */}
      {data?.referrals?.length > 0 && (
        <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-sm font-black text-gray-700 uppercase tracking-wider flex items-center gap-2">
              <FiUsers size={14} className="text-maroon-700" />
              Your Referred Members
            </h2>
            <span className="bg-maroon-50 text-maroon-700 font-black text-xs px-3 py-1 rounded-full">
              {data.total_referrals} total
            </span>
          </div>
          <div className="space-y-2">
            {data.referrals.map((ref, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-maroon-100 flex items-center justify-center font-heading font-black text-maroon-700 text-sm">
                    {ref.name?.charAt(0) || '?'}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">{ref.name}</p>
                    <p className="text-[10px] text-gray-400 font-body">{ref.mobile} · {ref.date}</p>
                  </div>
                </div>
                <div className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${
                  ref.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                }`}>
                  <FiCheckCircle size={10} />
                  {ref.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
