import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiUser, FiMapPin, FiUsers, FiShare2, FiToggleLeft, FiToggleRight } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { getMemberDetail, updateStatus } from '../../api/adminApi';

export default function MemberDetail() {
  const { id }  = useParams();
  const navigate = useNavigate();
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState(false);

  useEffect(() => {
    getMemberDetail(id)
      .then((r) => setData(r.data.data))
      .catch(() => { toast.error('Member not found'); navigate('/admin/members'); })
      .finally(() => setLoading(false));
  }, [id]);

  const handleToggleStatus = async () => {
    const newStatus = data.status === 'active' ? 'inactive' : 'active';
    if (!confirm(`Status को ${newStatus} करें?`)) return;
    setToggling(true);
    try {
      await updateStatus(id, newStatus);
      setData((d) => ({ ...d, status: newStatus }));
      toast.success(`Status updated: ${newStatus}`);
    } catch { toast.error('Update नहीं हुआ'); }
    finally { setToggling(false); }
  };

  if (loading) return <PageLoader />;
  if (!data)   return null;

  return (
    <div className="max-w-full">
      {/* Back + Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4 bg-white p-4 md:p-5 border border-gray-100 shadow-sm rounded-xl">
        <div className="flex items-center gap-3 md:gap-5">
          <button onClick={() => navigate(-1)} className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors rounded-full shrink-0">
            <FiArrowLeft size={20} />
          </button>
          
          <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
            {/* Member Photo */}
            <div className="w-12 h-12 md:w-16 md:h-16 bg-maroon-50 rounded-full overflow-hidden border-2 border-white shadow-sm ring-1 ring-maroon-100 shrink-0">
              {data.photo_url ? (
                <img src={data.photo_url} alt={data.full_name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-heading font-black text-xl md:text-2xl text-maroon-200">
                  {data.full_name?.charAt(0) || 'M'}
                </div>
              )}
            </div>

            <div className="overflow-hidden">
              <h1 className="font-heading text-lg md:text-2xl font-black text-gray-900 tracking-tight truncate">{data.full_name || 'No Name'}</h1>
              <p className="text-[11px] md:text-sm text-gray-400 font-body mt-0.5 flex items-center gap-1.5 flex-wrap">
                <span className="font-bold text-gray-300">{data.member_id}</span>
                <span className="hidden sm:inline w-1 h-1 bg-gray-200 rounded-full"></span>
                <span>{data.mobile}</span>
              </p>
            </div>
          </div>
        </div>
        
        <button onClick={handleToggleStatus} disabled={toggling} className={`w-full md:w-auto flex items-center justify-center gap-2 text-xs font-heading font-black px-6 py-3 border-2 transition-all rounded-xl active:scale-95 ${data.status === 'active' ? 'border-red-100 text-red-600 hover:bg-red-50' : 'border-emerald-100 text-emerald-600 hover:bg-emerald-50'}`}>
          {data.status === 'active' ? <FiToggleRight size={18} /> : <FiToggleLeft size={18} />}
          {toggling ? 'Updating...' : data.status === 'active' ? 'Deactivate Member' : 'Activate Member'}
        </button>
      </div>

      {/* Sections */}
      <div className="space-y-4">
        {/* Personal */}
        <Section title="Personal Info" icon={FiUser}>
          <Grid>
            <Info label="Full Name"   value={data.full_name} />
            <Info label="Mobile"      value={data.mobile} />
            <Info label="DOB"         value={data.dob ? new Date(data.dob).toLocaleDateString('en-GB') : '-'} />
            <Info label="Gender"      value={data.gender} />
            <Info label="Occupation"  value={data.occupation} />
            <Info label="Email"       value={data.email} />
            <Info label="Voter ID"    value={data.voter_id} />
            <Info label="Status"      value={<StatusBadge status={data.status} />} />
            <Info label="Joined On"   value={data.created_at ? new Date(data.created_at).toLocaleDateString('en-GB') : '-'} />
          </Grid>
        </Section>

        {/* Location */}
        <Section title="Location" icon={FiMapPin}>
          <Grid>
            <Info label="State"    value={data.state} />
            <Info label="District" value={data.district} />
            <Info label="Block"    value={data.block} />
            <Info label="Assembly" value={data.assembly} />
            <Info label="Village"  value={data.village_ward} />
            <Info label="Pincode"  value={data.pincode} />
            <Info label="Address"  value={data.address_line} />
          </Grid>
        </Section>

        {/* Family */}
        <Section title="Family Members" icon={FiUsers}>
          {data.family_members && data.family_members.length > 0 ? (
            <div className="overflow-x-auto scrollbar-hide">
              <table className="w-full text-left font-body min-w-[500px]">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="py-3 px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Name</th>
                    <th className="py-3 px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Relation</th>
                    <th className="py-3 px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Age</th>
                    <th className="py-3 px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Voter ID</th>
                    <th className="py-3 px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Mobile</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {data.family_members.map((fam, idx) => (
                    <tr key={idx} className="group hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4 text-sm font-bold text-gray-800 whitespace-nowrap">{fam.name}</td>
                      <td className="py-3 px-4 text-xs font-semibold text-maroon-600 uppercase tracking-wide whitespace-nowrap">{fam.relation}</td>
                      <td className="py-3 px-4 text-sm text-gray-600 text-center font-bold">{fam.age || '-'}</td>
                      <td className="py-3 px-4 text-sm text-gray-600 font-medium whitespace-nowrap">{fam.voter_id || '-'}</td>
                      <td className="py-3 px-4 text-sm text-gray-600 font-medium whitespace-nowrap">{fam.mobile || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-gray-400 italic py-4">No family members registered.</p>
          )}
        </Section>

        {/* Social */}
        {data.social_profiles?.length > 0 && (
          <Section title="Social Media" icon={FiShare2}>
            <div className="space-y-3">
              {data.social_profiles.map((s) => (
                <div key={s.id} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 p-2 bg-gray-50 rounded-md">
                  <span className="text-[10px] font-black text-maroon-600 uppercase w-20 shrink-0">{s.platform}</span>
                  <a href={s.profile_url} target="_blank" rel="noreferrer" className="text-xs text-gray-700 hover:text-maroon-700 hover:underline font-body truncate">{s.profile_url}</a>
                </div>
              ))}
            </div>
          </Section>
        )}
      </div>
    </div>
  );
}

function Section({ title, icon: Icon, children }) {
  return (
    <div className="bg-white border border-gray-100 shadow-sm">
      <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-gray-100">
        <Icon size={14} className="text-maroon-700" />
        <h2 className="font-heading text-sm font-bold text-gray-700">{title}</h2>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}
function Grid({ children }) { return <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6">{children}</div>; }
function Info({ label, value, span }) {
  return (
    <div className={span ? 'col-span-2 md:col-span-3' : ''}>
      <p className="text-[11px] text-maroon-600 font-black uppercase tracking-wider">{label}</p>
      <p className="text-sm text-gray-800 font-body mt-1 font-semibold">{value || <span className="text-gray-300">—</span>}</p>
    </div>
  );
}
function StatusBadge({ status }) {
  const colors = { active: 'text-emerald-600', pending: 'text-amber-600', inactive: 'text-gray-500' };
  return <span className={`font-semibold capitalize font-heading ${colors[status] || colors.pending}`}>{status}</span>;
}
function PageLoader() {
  return <div className="h-64 flex items-center justify-center"><div className="w-8 h-8 border-4 border-maroon-100 border-t-maroon-700 rounded-full animate-spin" /></div>;
}
