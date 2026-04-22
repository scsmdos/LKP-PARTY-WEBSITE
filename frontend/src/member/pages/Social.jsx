import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiSave, FiFacebook, FiInstagram, FiTwitter, FiYoutube } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { getSocial, saveSocial } from '../../api/memberApi';

const PLATFORMS = [
  { key: 'facebook',  label: 'Facebook',  Icon: FiFacebook,  placeholder: 'https://facebook.com/username', color: 'text-blue-600' },
  { key: 'instagram', label: 'Instagram', Icon: FiInstagram, placeholder: 'https://instagram.com/username', color: 'text-pink-500' },
  { key: 'twitter',   label: 'X (Twitter)', Icon: FiTwitter, placeholder: 'https://twitter.com/username', color: 'text-sky-500' },
  { key: 'youtube',   label: 'YouTube',   Icon: FiYoutube,   placeholder: 'https://youtube.com/@channel', color: 'text-red-600' },
];

export default function MemberSocial() {
  const [saving, setSaving] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    getSocial()
      .then((r) => {
        const map = {};
        r.data.data.forEach((s) => { map[s.platform] = s.profile_url; });
        reset(map);
      })
      .catch(() => {});
  }, []);

  const onSubmit = async (data) => {
    setSaving(true);
    // Build array of non-empty entries
    const profiles = Object.entries(data)
      .filter(([, url]) => url?.trim())
      .map(([platform, profile_url]) => ({ platform, profile_url: profile_url.trim() }));
    try {
      await saveSocial({ profiles });
      reset({ facebook: '', instagram: '', twitter: '', youtube: '' });
      toast.success('Social profiles updated successfully');
    } catch {
      toast.error('Could not save social profiles');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="bg-white border border-gray-100 shadow-sm p-6 rounded-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PLATFORMS.map(({ key, label, Icon, placeholder, color }) => (
              <div key={key} className="space-y-1.5">
                <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                  <Icon size={14} className={color} />{label}
                </label>
                <input
                  {...register(key, {
                    pattern: { value: /^https?:\/\/.+/, message: 'Enter a valid URL (https://...)' },
                  })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2 text-sm focus:bg-white focus:ring-2 focus:ring-maroon-100 focus:border-maroon-300 transition-all outline-none"
                  placeholder={placeholder}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-center sm:justify-end pt-2">
            <button type="submit" disabled={saving} className="bg-maroon-700 text-white hover:bg-maroon-800 disabled:bg-gray-300 px-8 py-2 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md active:scale-95">
              {saving ? <Spinner /> : <><FiSave size={18} /><span>Save Links</span></>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Spinner() {
  return <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />;
}
