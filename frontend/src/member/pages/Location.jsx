import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiSave, FiMapPin, FiNavigation, FiEdit3 } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { saveLocation, getLocation } from '../../api/memberApi';
import { useAuth } from '../../contexts/AuthContext';
import { LOCATION_DATA } from '../../data/locations';
import { ASSEMBLY_DATA } from '../../data/assemblies';

const PRIMARY_STATES = ['Bihar', 'Jharkhand', 'Uttar Pradesh', 'Other'];

export default function MemberLocation() {
  const { member, refreshMember }   = useAuth();
  const [loading, setLoading]       = useState(true);
  const [saving, setSaving]         = useState(false);
  const [availableDistricts, setAvailableDistricts] = useState([]);
  const [availableBlocks, setAvailableBlocks]       = useState([]);
  const [availableAssemblies, setAvailableAssemblies] = useState([]);

  const { register, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm();

  const watchedState    = watch('state');
  const customState     = watch('custom_state');
  const watchedDistrict = watch('district');

  useEffect(() => {
    load();
  }, []); // Run only on mount. onSubmit will manually clear it and refreshMember won't trigger re-load because we don't watch member in this useEffect.

  const load = async () => {
    try {
      const r = await getLocation();
      const data = r.data.data;
      if (data) {
        // If state is not in primary list, it was a custom one
        if (data.state && !PRIMARY_STATES.includes(data.state)) {
          reset({ ...data, state: 'Other', custom_state: data.state });
        } else {
          reset(data);
        }
      }
    } catch { }
    finally { setLoading(false); }
  };

  // Cascading Logic for Districts
  useEffect(() => {
    const stateToLookup = watchedState === 'Other' ? customState : watchedState;
    if (stateToLookup && LOCATION_DATA[stateToLookup]) {
      const districts = Object.keys(LOCATION_DATA[stateToLookup]).sort();
      setAvailableDistricts(districts);
    } else {
      setAvailableDistricts([]);
    }
  }, [watchedState, customState]);

  // Cascading Logic for Blocks
  useEffect(() => {
    const stateToLookup = watchedState === 'Other' ? customState : watchedState;
    if (stateToLookup && watchedDistrict && LOCATION_DATA[stateToLookup]?.[watchedDistrict]) {
      const blocks = LOCATION_DATA[stateToLookup][watchedDistrict].sort();
      setAvailableBlocks(blocks);
    } else {
      setAvailableBlocks([]);
    }
  }, [watchedState, watchedDistrict, customState]);

  // Cascading Logic for Assemblies
  useEffect(() => {
    const stateToLookup = watchedState === 'Other' ? customState : watchedState;
    if (stateToLookup && watchedDistrict && ASSEMBLY_DATA[stateToLookup]?.[watchedDistrict]) {
      setAvailableAssemblies(ASSEMBLY_DATA[stateToLookup][watchedDistrict].sort());
    } else {
      setAvailableAssemblies([]);
      setValue('assembly', '');
    }
  }, [watchedState, watchedDistrict, customState]);

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      // If Other, use custom_state as the state
      const finalData = { ...data };
      if (data.state === 'Other') {
        finalData.state = data.custom_state;
      }
      delete finalData.custom_state;

      await saveLocation(finalData);
      await refreshMember();
      toast.success('Location details updated successfully!');
    } catch {
      toast.error('Failed to save location details');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="h-64 flex flex-col items-center justify-center gap-4">
      <Spinner dark />
      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Loading Location Details...</p>
    </div>
  );

  return (
    <div className="max-w-5xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white border border-gray-100 shadow-sm p-6 sm:p-8 rounded-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* State Selection */}
            <div className={watchedState === 'Other' ? 'md:col-span-1' : 'md:col-span-1'}>
              <Field label="State *" error={errors.state?.message}>
                <select 
                  {...register('state', { required: 'State is required' })} 
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2 text-sm focus:bg-white focus:ring-2 focus:ring-maroon-100 focus:border-maroon-300 transition-all outline-none appearance-none cursor-pointer font-bold"
                >
                  <option value="">-- Select State --</option>
                  {PRIMARY_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </Field>
            </div>

            {/* Custom State Input (Only if 'Other' is selected) */}
            {watchedState === 'Other' && (
              <div className="md:col-span-1 animate-in zoom-in-95 duration-200">
                <Field label="Enter State Name *" error={errors.custom_state?.message}>
                  <div className="relative">
                    <input 
                      {...register('custom_state', { required: watchedState === 'Other' ? 'Please enter state name' : false })}
                      className="w-full bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-2 text-sm focus:bg-white focus:ring-2 focus:ring-maroon-100 focus:border-maroon-300 transition-all outline-none italic"
                      placeholder="e.g. Maharashtra"
                    />
                    <FiEdit3 className="absolute right-3 top-1/2 -translate-y-1/2 text-yellow-500" size={14} />
                  </div>
                </Field>
              </div>
            )}

            {/* District */}
            <Field label="District *" error={errors.district?.message}>
              {availableDistricts.length > 0 ? (
                <select 
                  {...register('district', { required: 'District is required' })} 
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2 text-sm focus:bg-white focus:ring-2 focus:ring-maroon-100 focus:border-maroon-300 transition-all outline-none appearance-none cursor-pointer" 
                >
                  <option value="">-- Select District --</option>
                  {availableDistricts.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              ) : (
                <input 
                  {...register('district', { required: 'District is required' })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2 text-sm focus:bg-white focus:ring-2 focus:ring-maroon-100 focus:border-maroon-300 transition-all outline-none"
                  placeholder={watchedState ? "Enter District Name" : "Select State First"}
                  disabled={!watchedState}
                />
              )}
            </Field>

            {/* Block */}
            <Field label="Block *" error={errors.block?.message}>
              {availableBlocks.length > 0 ? (
                <select 
                  {...register('block', { required: 'Block is required' })} 
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2 text-sm focus:bg-white focus:ring-2 focus:ring-maroon-100 focus:border-maroon-300 transition-all outline-none appearance-none cursor-pointer" 
                >
                  <option value="">-- Select Block --</option>
                  {availableBlocks.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              ) : (
                <input 
                  {...register('block', { required: 'Block is required' })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2 text-sm focus:bg-white focus:ring-2 focus:ring-maroon-100 focus:border-maroon-300 transition-all outline-none"
                  placeholder={watchedDistrict ? "Enter Block Name" : "Select District First"}
                  disabled={!watchedDistrict}
                />
              )}
            </Field>

            {/* Assembly (Vidhan Sabha) */}
            {availableAssemblies.length > 0 && (
              <Field label="Assembly / Vidhan Sabha" error={errors.assembly?.message}>
                <select
                  {...register('assembly')}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2 text-sm focus:bg-white focus:ring-2 focus:ring-maroon-100 focus:border-maroon-300 transition-all outline-none appearance-none cursor-pointer"
                >
                  <option value="">-- Select Assembly --</option>
                  {availableAssemblies.map((a) => <option key={a} value={a}>{a}</option>)}
                </select>
              </Field>
            )}

            {/* Village */}
            <Field label="Village / Ward *" error={errors.village_ward?.message}>
              <input
                {...register('village_ward', { required: 'Village/Ward is required' })}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2 text-sm focus:bg-white focus:ring-2 focus:ring-maroon-100 focus:border-maroon-300 transition-all outline-none"
                placeholder="Village or Ward Name"
              />
            </Field>

            {/* Pincode */}
            <Field label="PIN Code *" error={errors.pincode?.message}>
              <input
                {...register('pincode', {
                  required: 'Pincode is required',
                  pattern: { value: /^\d{6}$/, message: 'Must be a 6-digit PIN Code' },
                })}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2 text-sm focus:bg-white focus:ring-2 focus:ring-maroon-100 focus:border-maroon-300 transition-all outline-none" 
                maxLength={6} 
                placeholder="800001"
              />
            </Field>

            {/* Address Line (Col Span 3) */}
            <div className="md:col-span-3">
              <Field label="Full Address">
                <textarea
                  {...register('address_line')}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2 text-sm focus:bg-white focus:ring-2 focus:ring-maroon-100 focus:border-maroon-300 transition-all outline-none resize-none"
                  rows={2}
                  placeholder="House No, Street, Landmark..."
                />
              </Field>
            </div>
          </div>

          <div className="flex justify-center sm:justify-end pt-2">
            <button type="submit" disabled={saving} className="bg-maroon-700 text-white hover:bg-maroon-800 disabled:bg-gray-300 px-10 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md active:scale-95 duration-200">
              {saving ? <Spinner /> : <><FiSave size={18} /><span>Save Location</span></>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <div className="space-y-1.5 w-full">
      <div className="flex justify-between items-center px-1">
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">{label}</label>
      </div>
      <div className="relative group">
        {children}
        {children.type === 'select' && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-maroon-700 transition-colors">
            <FiNavigation size={12} className="rotate-90" />
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-[11px] font-bold mt-1 ml-1 animate-pulse">{error}</p>}
    </div>
  );
}

function Spinner({ dark }) {
  return <div className={`w-5 h-5 border-3 rounded-full animate-spin ${dark ? 'border-gray-200 border-t-maroon-700' : 'border-white border-t-transparent'}`} />;
}
