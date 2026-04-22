import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiPhone, FiShield, FiArrowRight, FiRefreshCw, FiCheckCircle, FiUser } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { sendOtp, verifyOtp, savePersonal, getMe } from '../../api/memberApi';
import { useAuth } from '../../contexts/AuthContext';
import logo from '../../assets/logo.png';
import logotext from '../../assets/logotext.png';

const RESEND_COOLDOWN = 60; // seconds

export default function MemberLogin() {
  const navigate              = useNavigate();
  const location              = useLocation();
  const { login, member }     = useAuth();
  const [step, setStep]       = useState('mobile');
  const [mobile, setMobile]   = useState('');
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [regData, setRegData] = useState({ full_name: '', email: '', gender: '', dob: '' });
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const inputRefs             = useRef([]);
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Capture referral code from URL: /member/login?ref=LKPXXXXX
  const referralCode = new URLSearchParams(location.search).get('ref');

  // If already logged in, redirect based on profile completion
  useEffect(() => {
    if (member) {
      if (member.full_name) {
        if (step !== 'register' && step !== 'success') {
          const redirectTo = location.state?.from?.pathname || '/member/dashboard';
          navigate(redirectTo, { replace: true });
        }
      } else {
        if (step !== 'register' && step !== 'success') {
          setStep('register');
        }
      }
    }
  }, [member, navigate, step, location.state]);

  // Cooldown timer
  useEffect(() => {
    if (!cooldown) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  // ── Send OTP (Backend) ──────────────────────────────────────────────────
  const handleSendOtp = async ({ phone }) => {
    setLoading(true);
    try {
      await sendOtp(phone);
      setMobile(phone);
      setStep('otp');
      setCooldown(RESEND_COOLDOWN);
      toast.success('Code sent to your mobile');
      setTimeout(() => inputRefs.current[0]?.focus(), 200);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ── OTP Input Handling ────────────────────────────────────────────────────
  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const updated = [...otpDigits];
    updated[index] = value.slice(-1);
    setOtpDigits(updated);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // ── Verify OTP (Backend) ────────────────────────────────────────────────
  const handleVerifyOtp = async () => {
    const otp = otpDigits.join('');
    if (otp.length < 6) { toast.error('Please enter 6-digit OTP'); return; }
    
    setLoading(true);
    try {
      const res = await verifyOtp(mobile, otp, referralCode);
      
      login(res.data.token, res.data.member);
      toast.success('Mobile Verified');
      
      if (!res.data.member.full_name) {
        setStep('register');
      } else {
        const redirectTo = location.state?.from?.pathname || '/member/dashboard';
        navigate(redirectTo, { replace: true });
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Invalid OTP or technical issue');
    } finally {
      setLoading(false);
    }
  };

  // ── Registration Submit ───────────────────────────────────────────────────
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!regData.full_name || !regData.gender || !regData.dob) return toast.error('Please fill all required fields');
    
    setLoading(true);
    try {
      await savePersonal(regData);
      const res = await getMe();
      // Auth context re-sync
      login(localStorage.getItem('member_token'), res.data.data);
      toast.success('Profile created successfully!');
      setStep('success'); // Move to success card
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center px-4 bg-[#fcfcfc]">
      <div className="w-full max-w-md relative bg-white border border-gray-100 shadow-2xl rounded-2xl mt-20 mb-12">
        {/* Header Logo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="bg-white rounded-full p-1.5 shadow-xl border-4 border-white">
            <img src={logo} alt="LKP Logo" className="h-20 w-20 object-contain p-1" />
          </div>
        </div>

        <div className="px-8 pb-10 pt-14 text-center">
          {step === 'mobile' ? (
            <form onSubmit={handleSubmit(handleSendOtp)} className="space-y-6">
              
              {/* Missed Call Section */}
              <div className="bg-[#FFF9F2] border-2 border-dashed border-maroon-100 rounded-2xl p-6 mb-6">
                <p className="font-heading font-bold text-gray-700 text-base mb-3 italic">Give a missed call on</p>
                <a 
                  href="tel:+918804757309" 
                  className="inline-flex items-center gap-3 bg-maroon-700 hover:bg-maroon-800 text-white font-heading font-black text-lg px-5 py-1.5 rounded-lg shadow-lg transition-transform active:scale-95"
                >
                  <FiPhone size={18} className="rotate-12" /> 88047 57309
                </a>
                <p className="font-heading font-bold text-gray-700 text-sm mt-4">and become a part of the LKP</p>
              </div>

              {/* Or Divider */}
              <div className="relative flex items-center justify-center my-8">
                <div className="absolute w-full h-0.5 bg-gray-100 italic" />
                <div className="relative bg-maroon-700 text-white font-heading font-black text-[10px] uppercase w-8 h-8 rounded-full flex items-center justify-center z-10 shadow-md">
                  or
                </div>
              </div>

              {/* Mobile Input Section */}
              <div className="text-left space-y-1.5">
                <label className="block text-xs font-heading font-bold text-gray-600 uppercase tracking-wide">
                  Enter Your Mobile Number <span className="text-red-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-0 h-full px-3 flex items-center gap-1.5 border-r border-gray-100 bg-gray-50/50 rounded-l-lg pointer-events-none">
                    <img src="https://flagcdn.com/w20/in.png" alt="IN" className="w-4 shadow-sm" />
                    <span className="text-sm font-bold text-gray-600">+91</span>
                  </div>
                  <input
                    {...register('phone', {
                      required: 'Mobile is required',
                      pattern: { value: /^[6-9]\d{9}$/, message: 'Enter valid 10 digits' },
                    })}
                    type="tel"
                    maxLength={10}
                    placeholder="9876543210"
                    className="w-full pl-20 pr-4 py-3.5 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-800 focus:outline-none focus:border-maroon-700 focus:ring-4 focus:ring-maroon-100 transition-all placeholder:text-gray-300"
                  />
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="absolute right-1.5 bg-maroon-700 hover:bg-maroon-800 text-white font-heading font-black text-[10px] uppercase tracking-widest px-4 py-2 rounded-md shadow-md transition-all active:scale-95 disabled:opacity-50"
                  >
                    {loading ? <Spinner /> : 'Send OTP'}
                  </button>
                </div>
                {errors.phone && <p className="text-red-500 text-[10px] font-bold uppercase mt-1">{errors.phone.message}</p>}
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-3 text-left">
                <input 
                  type="checkbox" 
                  required
                  id="terms"
                  className="mt-1 w-4 h-4 rounded border-gray-300 text-maroon-700 focus:ring-maroon-500"
                />
                <label htmlFor="terms" className="text-[10px] text-gray-500 font-body leading-relaxed select-none cursor-pointer">
                  I certify that above provided information is correct and there is no mistake. I know that all further party communications will be sent to this mobile number.
                </label>
              </div>



            </form>
          ) : step === 'otp' ? (
            <div className="space-y-6">
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 bg-maroon-50 text-maroon-700 rounded-full flex items-center justify-center shadow-inner">
                  <FiShield size={28} />
                </div>
                <div className="text-center">
                  <h2 className="font-heading text-xl font-bold text-maroon-900 tracking-tight">Verify OTP</h2>
                  <p className="text-xs text-gray-400 font-body uppercase font-bold tracking-widest mt-1">SENT TO +91 {mobile}</p>
                </div>
              </div>

              {/* OTP Boxes */}
              <div className="flex gap-3 mb-6 justify-center">
                {otpDigits.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => (inputRefs.current[i] = el)}
                    type="tel"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    className="w-12 h-14 text-center text-xl font-heading font-black border border-gray-100 bg-gray-50 rounded-xl focus:bg-white focus:border-maroon-700 focus:ring-4 focus:ring-maroon-100 focus:outline-none transition-all shadow-sm"
                  />
                ))}
              </div>

              <button 
                onClick={handleVerifyOtp} 
                disabled={loading} 
                className="w-full bg-maroon-700 hover:bg-maroon-800 text-white font-heading font-black py-4 px-6 rounded-xl transition-all shadow-xl flex items-center justify-center gap-3 uppercase tracking-widest text-sm active:translate-y-0.5"
              >
                {loading ? <Spinner /> : <><span>Verify Now</span><FiShield size={18} /></>}
              </button>

              <div className="text-center pt-2">
                {cooldown > 0 ? (
                  <div className="text-[10px] text-gray-400 font-body uppercase font-bold tracking-[0.2em]">Resend in {cooldown}s</div>
                ) : (
                  <button
                    onClick={() => handleSendOtp({ phone: mobile })}
                    className="text-xs text-maroon-700 font-bold uppercase tracking-widest flex items-center gap-2 mx-auto hover:text-maroon-900 transition-colors"
                  >
                    <FiRefreshCw size={14} className="animate-spin-slow" /> Resend Code
                  </button>
                )}
                <button 
                  onClick={() => setStep('mobile')} 
                  className="text-[9px] text-gray-300 mt-6 block mx-auto font-bold uppercase tracking-[0.2em] hover:text-maroon-700 transition-colors"
                >
                  Edit phone number
                </button>
              </div>
            </div>
          ) : step === 'register' ? (
            <form onSubmit={handleRegisterSubmit} className="space-y-5 text-left animate-in fade-in slide-in-from-bottom-4">
              <div className="text-center mb-6">
                <div className="w-14 h-14 bg-maroon-50 text-maroon-700 rounded-full flex items-center justify-center mx-auto shadow-inner mb-3">
                  <FiUser size={28} />
                </div>
                <h2 className="font-heading text-xl font-bold text-maroon-900 tracking-tight">Complete Profile</h2>
                <p className="text-xs text-gray-500 font-body mt-1">Tell us a bit about yourself</p>
              </div>

              <div>
                <label className="block text-[11px] font-heading font-bold text-gray-600 uppercase tracking-wide mb-1.5">Full Name <span className="text-red-500">*</span></label>
                <input required type="text" value={regData.full_name} onChange={e => setRegData({...regData, full_name: e.target.value})} className="w-full font-body text-sm bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:bg-white focus:border-maroon-700 focus:ring-4 focus:ring-maroon-100 focus:outline-none transition-all shadow-sm" placeholder="Your full name" />
              </div>

              <div>
                <label className="block text-[11px] font-heading font-bold text-gray-600 uppercase tracking-wide mb-1.5">Email (Optional)</label>
                <input type="email" value={regData.email} onChange={e => setRegData({...regData, email: e.target.value})} className="w-full font-body text-sm bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:bg-white focus:border-maroon-700 focus:ring-4 focus:ring-maroon-100 focus:outline-none transition-all shadow-sm" placeholder="your@email.com" />
              </div>

              <div>
                <label className="block text-[11px] font-heading font-bold text-gray-600 uppercase tracking-wide mb-1.5">Date of Birth <span className="text-red-500">*</span></label>
                <input required type="date" value={regData.dob} onChange={e => setRegData({...regData, dob: e.target.value})} className="w-full font-body text-sm bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:bg-white focus:border-maroon-700 focus:ring-4 focus:ring-maroon-100 focus:outline-none transition-all shadow-sm" />
              </div>

              <div>
                <label className="block text-[11px] font-heading font-bold text-gray-600 uppercase tracking-wide mb-1.5">Gender <span className="text-red-500">*</span></label>
                <select required value={regData.gender} onChange={e => setRegData({...regData, gender: e.target.value})} className="w-full font-body text-sm bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:bg-white focus:border-maroon-700 focus:ring-4 focus:ring-maroon-100 focus:outline-none transition-all shadow-sm">
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other / Transgender</option>
                </select>
              </div>

              <button type="submit" disabled={loading} className="w-full bg-maroon-700 hover:bg-maroon-800 text-white font-heading font-black py-4 px-6 rounded-xl transition-all shadow-xl flex items-center justify-center gap-3 uppercase tracking-widest text-sm mt-8 active:translate-y-0.5">
                {loading ? <Spinner /> : <><span>Create Member ID</span><FiArrowRight size={18} /></>}
              </button>
            </form>
          ) : (
            <div className="space-y-6 text-center animate-in fade-in slide-in-from-bottom-6">
              <Confetti />
              
              <div className="relative pt-4">
                <div className="absolute inset-0 top-4 bg-yellow-400 blur-3xl opacity-20 animate-pulse rounded-full pointer-events-none" />
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-green-400 to-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-xl border-4 border-white relative z-10">
                  <FiCheckCircle className="w-8 h-8 md:w-10 md:h-10" />
                </div>
              </div>
              
              <div className="relative z-10 mt-2 md:mt-4">
                <h2 className="font-heading text-2xl md:text-3xl font-black bg-gradient-to-r from-maroon-800 to-maroon-600 bg-clip-text text-transparent tracking-tight mt-2 px-2">Congratulations!</h2>
                <p className="text-gray-500 font-body leading-relaxed text-xs md:text-sm mt-1 px-4">You are now an officially registered member of the <strong className="text-gray-800">Lok Kalyan Party</strong>.</p>
              </div>
              
              {/* ID Card */}
              <div className="bg-gradient-to-br from-maroon-800 via-maroon-700 to-maroon-900 rounded-2xl p-5 md:p-6 mt-6 md:mt-8 text-left relative overflow-hidden shadow-2xl transform transition-transform hover:scale-105 duration-300">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-5 rounded-full blur-xl pointer-events-none" />
                <div className="absolute top-10 -left-10 w-32 h-32 bg-yellow-400 opacity-10 rounded-full blur-xl pointer-events-none" />
                
                <div className="absolute opacity-5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                     <img src={logo} alt="Watermark" className="w-48 h-48 object-contain mix-blend-overlay" />
                </div>

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4 md:mb-6">
                    <div className="min-w-0 pr-2">
                      <p className="text-[9px] md:text-[10px] text-yellow-400 font-bold uppercase tracking-widest mb-1 opacity-90">Official Member ID</p>
                      <p className="font-heading font-black text-white text-lg md:text-2xl tracking-widest drop-shadow-md truncate whitespace-nowrap">{member?.member_id}</p>
                    </div>
                    <img src={logo} alt="LKP Logo" className="w-8 h-8 md:w-10 md:h-10 object-contain drop-shadow-lg shrink-0" />
                  </div>
                  
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-4 md:mb-5" />

                  <div>
                    <p className="text-[9px] md:text-[10px] text-white/50 font-bold uppercase tracking-widest mb-1">Member Name</p>
                    <p className="font-bold text-white text-sm md:text-lg capitalize tracking-wide truncate">{member?.full_name}</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => {
                   const redirectTo = location.state?.from?.pathname || '/member/dashboard';
                   navigate(redirectTo, { replace: true });
                }} 
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-heading font-black py-3 px-4 md:py-4 md:px-6 rounded-xl transition-all shadow-xl shadow-green-600/20 flex items-center justify-center gap-2 uppercase tracking-wide md:tracking-widest text-xs md:text-sm mt-8 active:scale-95 whitespace-nowrap"
              >
                Go to My Dashboard <FiArrowRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Spinner() {
  return <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />;
}

function Confetti() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute top-[-10%]"
          style={{
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 8 + 6}px`,
            height: `${Math.random() * 12 + 6}px`,
            backgroundColor: ['#ffeb3b', '#4caf50', '#f44336', '#2196f3', '#9c27b0', '#ff9800', '#00bcd4'][Math.floor(Math.random() * 7)],
            animation: `fall ${Math.random() * 3 + 2}s linear ${Math.random() * 2}s forwards`,
            transform: `rotate(${Math.random() * 360}deg)`,
            opacity: Math.random() > 0.5 ? 1 : 0.8
          }}
        />
      ))}
      <style>{`
        @keyframes fall {
          to {
            transform: translateY(110vh) rotate(720deg);
          }
        }
      `}</style>
    </div>
  );
}
