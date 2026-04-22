import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiPlus, FiTrash2, FiEdit2, FiX, FiCheck, FiUsers } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { getFamily, addFamily, updateFamily, deleteFamily } from '../../api/memberApi';

const RELATIONS = ['Wife', 'Husband', 'Son', 'Daughter', 'Father', 'Mother', 'Brother', 'Sister', 'Other'];

export default function MemberFamily() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const load = () => {
    setLoading(true);
    getFamily()
      .then((r) => setMembers(r.data.data))
      .catch(() => toast.error('Failed to load family data'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { reset({}); setEditId(null); setShowForm(true); };
  const openEdit = (m) => { reset(m); setEditId(m.id); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditId(null); reset({}); };

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      if (editId) { await updateFamily(editId, data); toast.success('Member updated successfully'); }
      else { await addFamily(data); toast.success('Family member added successfully'); }
      load(); closeForm();
    } catch { toast.error('Failed to save data'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Remove this family member?')) return;
    try { await deleteFamily(id); toast.success('Member removed'); load(); }
    catch { toast.error('Could not delete'); }
  };

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex flex-row items-center justify-between gap-4">
        <h2 className="font-heading text-base sm:text-lg font-black text-gray-800 tracking-tight leading-tight">Manage Family Members</h2>
        {!showForm && (
          <button onClick={openAdd} className="bg-maroon-700 text-white hover:bg-maroon-800 px-4 sm:px-5 py-2 rounded-xl text-[10px] sm:text-xs font-bold transition-all shadow-md active:scale-95 flex items-center gap-1.5 shrink-0 whitespace-nowrap">
            <FiPlus size={14} /> Add Member
          </button>
        )}
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white border border-maroon-100 shadow-xl p-6 rounded-2xl animate-in zoom-in duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-heading text-sm font-black text-gray-800 uppercase tracking-widest">{editId ? 'Edit' : 'Add'} Family Member</h3>
            <button onClick={closeForm} className="bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-full p-1.5 transition-colors"><FiX size={16} /></button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Field label="Full Name *" error={errors.name?.message}>
                <input {...register('name', { required: 'Name is required' })} className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2 text-sm focus:bg-white focus:ring-2 focus:ring-maroon-100 focus:border-maroon-300 transition-all outline-none" placeholder="Enter Full Name" />
              </Field>

              <Field label="Relationship *" error={errors.relation?.message}>
                <select {...register('relation', { required: 'Relation is required' })} className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2 text-sm focus:bg-white focus:ring-2 focus:ring-maroon-100 focus:border-maroon-300 transition-all outline-none appearance-none cursor-pointer">
                  <option value="">-- Select --</option>
                  {RELATIONS.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </Field>

              <Field label="Age" error={errors.age?.message}>
                <input {...register('age')} type="number" min="0" max="150" className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2 text-sm focus:bg-white focus:ring-2 focus:ring-maroon-100 focus:border-maroon-300 transition-all outline-none" placeholder="Age" />
              </Field>

              <Field label="Voter ID (Optional)">
                <input {...register('voter_id')} className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2 text-sm focus:bg-white focus:ring-2 focus:ring-maroon-100 focus:border-maroon-300 transition-all outline-none" placeholder="ID Number" />
              </Field>

              <Field label="Mobile (Optional)">
                <input {...register('mobile')} type="tel" maxLength={10} className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2 text-sm focus:bg-white focus:ring-2 focus:ring-maroon-100 focus:border-maroon-300 transition-all outline-none" placeholder="Mobile Number" />
              </Field>
            </div>

            <div className="flex gap-3 justify-center sm:justify-end pt-2">
              <button type="button" onClick={closeForm} className="text-gray-500 hover:text-gray-700 font-bold text-sm px-6 py-2 transition-all">Cancel</button>
              <button type="submit" disabled={saving} className="bg-maroon-700 text-white hover:bg-maroon-800 disabled:bg-gray-300 px-8 py-2 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md active:scale-95">
                {saving ? <Spinner /> : <><FiCheck size={18} /><span>{editId ? 'Update Member' : 'Save Member'}</span></>}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* List */}
      {loading ? (
        <div className="h-48 flex flex-col items-center justify-center gap-3">
          <Spinner dark />
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Loading Family Data...</p>
        </div>
      ) : members.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-gray-200 p-12 text-center rounded-2xl">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiUsers className="text-gray-300" size={32} />
          </div>
          <p className="text-gray-500 font-bold text-sm">No family members added yet</p>
          <p className="text-xs text-gray-400 mt-1">Click the 'Add Member' button to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {members.map((m) => (
            <div key={m.id} className="bg-white border border-gray-100 shadow-sm p-5 rounded-2xl flex items-center gap-4 hover:border-maroon-200 hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-maroon-700 scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
              <div className="w-12 h-12 bg-maroon-50 rounded-xl flex items-center justify-center font-heading font-black text-maroon-700 text-lg shrink-0 transition-colors group-hover:bg-maroon-100">
                {m.name?.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-heading font-bold text-sm text-gray-800 truncate">{m.name}</p>
                <p className="text-[11px] font-bold text-maroon-600 mt-0.5 uppercase tracking-wider">{m.relation}</p>
                <div className="flex items-center gap-2 mt-1.5 opacity-60">
                  {m.age && <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded font-black">{m.age}Y</span>}
                  {m.voter_id && <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded font-black">{m.voter_id}</span>}
                </div>
              </div>
              <div className="flex flex-col gap-1 shrink-0">
                <button onClick={() => openEdit(m)} className="p-2 text-gray-400 hover:text-maroon-700 hover:bg-maroon-50 rounded-lg transition-all"><FiEdit2 size={14} /></button>
                <button onClick={() => handleDelete(m.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"><FiTrash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{label}</label>
      {children}
      {error && <p className="text-red-500 text-[11px] font-bold mt-1 ml-1 animate-pulse">{error}</p>}
    </div>
  );
}

function Spinner({ dark }) {
  return <div className={`w-5 h-5 border-3 rounded-full animate-spin ${dark ? 'border-gray-200 border-t-maroon-700' : 'border-white border-t-transparent'}`} />;
}
