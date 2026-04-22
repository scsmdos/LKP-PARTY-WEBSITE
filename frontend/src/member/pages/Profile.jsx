import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiSave, FiUpload } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { savePersonal, uploadPhoto } from '../../api/memberApi';
import { useAuth } from '../../contexts/AuthContext';

const OCCUPATIONS = ['Farmer', 'Business', 'Service', 'Labour', 'Student', 'Doctor', 'Teacher', 'Engineer', 'Lawyer', 'Other'];

export default function MemberProfile() {
  const { member, refreshMember } = useAuth();
  const [saving, setSaving]       = useState(false);
  const [uploading, setUploading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(member?.photo_url || null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      full_name:   '',
      dob:         '',
      gender:      '',
      occupation:  '',
      email:       '',
      voter_id:    '',
    },
  });

  // Load on mount and when member re-syncs
  useEffect(() => {
    if (member) {
      const formattedDob = member.dob ? member.dob.substring(0, 10) : '';
      reset({
        full_name: member.full_name || '',
        dob: formattedDob,
        gender: member.gender || '',
        occupation: member.occupation || '',
        email: member.email || '',
        voter_id: member.voter_id || '',
      });
    }
  }, [member, reset]);

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      await savePersonal(data);
      await refreshMember();
      toast.success('Personal details saved successfully');
    } catch {
      toast.error('Could not save details');
    } finally {
      setSaving(false);
    }
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { toast.error('Photo 2MB से कम होनी चाहिए'); return; }
    setPhotoPreview(URL.createObjectURL(file));
    setUploading(true);
    try {
      await uploadPhoto(file);
      await refreshMember();
      toast.success('Photo upload हो गई!');
    } catch {
      toast.error('Photo upload नहीं हुई');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-5xl">
      <div className="bg-white border border-gray-100 shadow-sm p-6 rounded-2xl">
        {/* Photo */}
        <div className="flex items-center gap-6 mb-10 pb-8 border-b border-gray-100/50">
          <div className="w-24 h-24 bg-maroon-50 rounded-full overflow-hidden shrink-0 relative border-4 border-white shadow-md ring-1 ring-gray-100">
            {photoPreview
              ? <img src={photoPreview} alt="Profile" className="w-full h-full object-cover" />
              : <span className="absolute inset-0 flex items-center justify-center font-heading font-black text-3xl text-maroon-300 bg-maroon-50">{member?.full_name?.charAt(0) || 'M'}</span>
            }
          </div>
          <div>
            <label className="bg-maroon-700 text-white hover:bg-maroon-800 transition-colors text-xs font-bold px-5 py-2.5 rounded-xl cursor-pointer flex items-center gap-2 shadow-sm">
              <FiUpload size={14} />
              {uploading ? 'Uploading...' : 'Change Photo'}
              <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} disabled={uploading} />
            </label>
            <p className="text-[11px] text-gray-400 font-medium font-body mt-2">JPG/PNG · Max 2MB recommended</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField label="Full Name *" error={errors.full_name?.message}>
              <input
                {...register('full_name', { required: 'Name is required' })}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2 text-sm focus:bg-white focus:ring-2 focus:ring-maroon-100 focus:border-maroon-300 transition-all outline-none"
                placeholder="Ram Kumar Singh"
              />
            </FormField>

            <FormField label="Date of Birth *" error={errors.dob?.message}>
              <input
                {...register('dob', { required: 'Birth date is required' })}
                type="date"
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2 text-sm focus:bg-white focus:ring-2 focus:ring-maroon-100 focus:border-maroon-300 transition-all outline-none"
                max={new Date().toISOString().split('T')[0]}
              />
            </FormField>

            <FormField label="Gender *" error={errors.gender?.message}>
              <select {...register('gender', { required: 'Select Gender' })} className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2 text-sm focus:bg-white focus:ring-2 focus:ring-maroon-100 focus:border-maroon-300 transition-all outline-none appearance-none cursor-pointer">
                <option value="">-- Select --</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </FormField>

            <FormField label="Occupation" error={errors.occupation?.message}>
              <select {...register('occupation')} className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2 text-sm focus:bg-white focus:ring-2 focus:ring-maroon-100 focus:border-maroon-300 transition-all outline-none appearance-none cursor-pointer">
                <option value="">-- Select --</option>
                {OCCUPATIONS.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </FormField>

            <FormField label="Email Address">
              <input {...register('email')} type="email" className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2 text-sm focus:bg-white focus:ring-2 focus:ring-maroon-100 focus:border-maroon-300 transition-all outline-none" placeholder="email@example.com" />
            </FormField>

            <FormField label="Voter ID Number">
              <input {...register('voter_id')} className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2 text-sm focus:bg-white focus:ring-2 focus:ring-maroon-100 focus:border-maroon-300 transition-all outline-none" placeholder="ABC1234567" />
            </FormField>
          </div>

          <div className="pt-4 flex justify-center sm:justify-end">
            <button type="submit" disabled={saving} className="bg-maroon-700 text-white hover:bg-maroon-800 disabled:bg-gray-300 px-6 py-2 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md active:scale-95">
              {saving ? <Spinner /> : <><FiSave size={18} /><span>Save Changes</span></>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FormField({ label, error, children }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">{label}</label>
      {children}
      {error && <p className="text-red-500 text-[11px] font-bold mt-1 ml-1 translate-y-1 animate-bounce">{error}</p>}
    </div>
  );
}
function PageHeader({ title, subtitle }) {
  return (
    <div className="mb-6">
      <h1 className="font-heading text-2xl font-black text-gray-900 tracking-tight">{title}</h1>
      <p className="text-sm font-medium text-gray-500 font-body mt-1">{subtitle}</p>
    </div>
  );
}
function Spinner() {
  return <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />;
}
