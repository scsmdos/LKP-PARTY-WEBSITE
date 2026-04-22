import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiFilter, FiDownload, FiEye, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { getMembers, exportMembers, getFilterOptions } from '../../api/adminApi';

import { useDebounce } from '../../hooks/useDebounce';

const STATUS_COLORS = {
  active:   'bg-emerald-50 text-emerald-700 border border-emerald-200',
  pending:  'bg-amber-50 text-amber-700 border border-amber-200',
  inactive: 'bg-gray-100 text-gray-600 border border-gray-200',
};

const PAGE_SIZE = 20;

export default function AdminMembers() {
  const [members, setMembers]       = useState([]);
  const [meta, setMeta]             = useState({ total: 0, current_page: 1, last_page: 1 });
  const [loading, setLoading]       = useState(true);
  const [exporting, setExporting]   = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Filters state
  const [search, setSearch]     = useState('');
  const [state, setState]       = useState('');
  const [district, setDistrict] = useState('');
  const [block, setBlock]       = useState('');
  const [status, setStatus]     = useState('');
  const [gender, setGender]     = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo]     = useState('');
  const [page, setPage]         = useState(1);

  const [availableStates, setAvailableStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [blocks, setBlocks]       = useState([]);

  // Fetch available states on mount
  useEffect(() => {
    getFilterOptions('state').then((r) => setAvailableStates(r.data.data)).catch(() => {});
  }, []);

  const debouncedSearch = useDebounce(search, 400);

  // Cascading location dropdowns
  useEffect(() => {
    if (!state) { setDistricts([]); setDistrict(''); setBlocks([]); setBlock(''); return; }
    getFilterOptions('district', { state }).then((r) => setDistricts(r.data.data)).catch(() => {});
    setDistrict(''); setBlock('');
  }, [state]);

  useEffect(() => {
    if (!district) { setBlocks([]); setBlock(''); return; }
    getFilterOptions('block', { district }).then((r) => setBlocks(r.data.data)).catch(() => {});
    setBlock('');
  }, [district]);

  const buildParams = useCallback(() => ({
    search: debouncedSearch, state, district, block, status, gender,
    date_from: dateFrom, date_to: dateTo, page, per_page: PAGE_SIZE,
  }), [debouncedSearch, state, district, block, status, gender, dateFrom, dateTo, page]);

  useEffect(() => {
    setLoading(true);
    getMembers(buildParams())
      .then((r) => { setMembers(r.data.data); setMeta(r.data.meta); })
      .catch(() => toast.error('Data load नहीं हुआ'))
      .finally(() => setLoading(false));
  }, [buildParams]);

  const resetFilters = () => {
    setSearch(''); setState(''); setDistrict(''); setBlock('');
    setStatus(''); setGender(''); setDateFrom(''); setDateTo(''); setPage(1);
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      const res = await exportMembers(buildParams());
      const url = URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement('a');
      a.href = url;
      a.download = `LKP-Members-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success('Export हो गया!');
    } catch { toast.error('Export नहीं हुआ'); }
    finally { setExporting(false); }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div>
          <h1 className="font-heading text-xl font-bold text-gray-800">Members</h1>
          <p className="text-xs text-gray-400 font-body mt-0.5">{meta.total} total members</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowFilters(!showFilters)} className="btn-outline text-xs px-4 py-2 gap-1.5 flex items-center">
            <FiFilter size={13} />{showFilters ? 'Hide' : 'Filters'}
          </button>
          <button onClick={handleExport} disabled={exporting} className="btn-primary gap-1.5 text-xs px-4 py-2 flex items-center">
            <FiDownload size={13} />{exporting ? 'Exporting...' : 'Export CSV'}
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <FiSearch className="absolute left-3 top-3 text-gray-400" size={15} />
        <input
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="form-input pl-9"
          placeholder="Search by name, mobile, member ID..."
        />
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white border border-gray-100 rounded-md shadow-sm p-5 mb-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <FS label="State">
            <select value={state} onChange={(e) => { setState(e.target.value); setPage(1); }} className="form-input rounded-md text-xs">
              <option value="">All States</option>
              {availableStates.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </FS>
          <FS label="District">
            <select value={district} onChange={(e) => { setDistrict(e.target.value); setPage(1); }} className="form-input rounded-md text-xs" disabled={!districts.length}>
              <option value="">All Districts</option>
              {districts.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </FS>
          <FS label="Block">
            <select value={block} onChange={(e) => { setBlock(e.target.value); setPage(1); }} className="form-input rounded-md text-xs" disabled={!blocks.length}>
              <option value="">All Blocks</option>
              {blocks.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </FS>
          <FS label="Status">
            <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }} className="form-input rounded-md text-xs">
              <option value="">All</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option>
            </select>
          </FS>
          <FS label="Gender">
            <select value={gender} onChange={(e) => { setGender(e.target.value); setPage(1); }} className="form-input rounded-md text-xs">
              <option value="">All</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </FS>
          <FS label="Date From">
            <input type="date" value={dateFrom} onChange={(e) => { setDateFrom(e.target.value); setPage(1); }} className="form-input rounded-md text-xs" />
          </FS>
          <FS label="Date To">
            <input type="date" value={dateTo} onChange={(e) => { setDateTo(e.target.value); setPage(1); }} className="form-input rounded-md text-xs" />
          </FS>
          <div className="flex items-end">
            <button onClick={resetFilters} className="text-xs text-maroon-600 font-body hover:text-maroon-800">Clear All</button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white border border-gray-100 shadow-sm rounded-md overflow-hidden">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-xs font-body">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {['Member ID', 'Name', 'Mobile', 'District', 'State', 'Status', 'Joined', 'Action'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-heading font-semibold text-gray-600 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={8} className="px-4 py-12 text-center text-gray-400">Loading...</td></tr>
              ) : members.length === 0 ? (
                <tr><td colSpan={8} className="px-4 py-12 text-center text-gray-400">No members found</td></tr>
              ) : (
                members.map((m) => (
                  <tr key={m.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-body font-medium text-maroon-700 whitespace-nowrap">{m.member_id}</td>
                    <td className="px-4 py-3 text-gray-800 whitespace-nowrap">{m.full_name || <span className="text-gray-300 italic">—</span>}</td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{m.mobile}</td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{m.district || '—'}</td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{m.state || '—'}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 text-[10px] font-heading font-semibold ${STATUS_COLORS[m.status] || STATUS_COLORS.pending}`}>
                        {m.status?.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                      {m.joined_at ? new Date(m.joined_at).toLocaleDateString('en-GB') : new Date(m.created_at).toLocaleDateString('en-GB')}
                    </td>
                    <td className="px-4 py-3">
                      <Link to={`/admin/members/${m.id}`} className="px-3 py-1.5 bg-maroon-50 text-maroon-700 hover:bg-maroon-100 rounded-md inline-flex items-center gap-1.5 transition-all font-bold text-[10px] border border-maroon-100 shadow-sm">
                        <FiEye size={12} />
                        <span>VIEW</span>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {meta.last_page > 1 && (
          <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
            <p className="text-xs text-gray-400 font-body">
              Page {meta.current_page} of {meta.last_page} · {meta.total} results
            </p>
            <div className="flex gap-1">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={meta.current_page === 1} className="p-1.5 text-gray-400 hover:text-gray-700 disabled:opacity-30"><FiChevronLeft size={14} /></button>
              <button onClick={() => setPage((p) => Math.min(meta.last_page, p + 1))} disabled={meta.current_page === meta.last_page} className="p-1.5 text-gray-400 hover:text-gray-700 disabled:opacity-30"><FiChevronRight size={14} /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function FS({ label, children }) {
  return (
    <div>
      <label className="block text-[10px] font-body font-medium text-gray-500 mb-1">{label}</label>
      {children}
    </div>
  );
}
