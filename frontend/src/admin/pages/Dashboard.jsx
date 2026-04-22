import React, { useEffect, useState } from 'react';
import { FiUsers, FiUserCheck, FiUserX, FiTrendingUp } from 'react-icons/fi';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import { getOverview, getByState, getGrowth } from '../../api/adminApi';

const STAT_CARDS = [
  { key: 'total',   label: 'Total Members',   icon: FiUsers,     color: 'bg-maroon-700 text-white' },
  { key: 'active',  label: 'Active Members',  icon: FiUserCheck, color: 'bg-emerald-600 text-white' },
  { key: 'pending', label: 'Pending',         icon: FiUserX,     color: 'bg-amber-500 text-white' },
  { key: 'today',   label: "Today's Joins",   icon: FiTrendingUp, color: 'bg-sky-600 text-white' },
];

const PIE_COLORS = ['#8B0000', '#D4AF37', '#10B981', '#3B82F6', '#F59E0B', '#8B5CF6', '#EC4899', '#06B6D4'];

export default function AdminDashboard() {
  const [stats, setStats]     = useState(null);
  const [byState, setByState] = useState([]);
  const [growth, setGrowth]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getOverview(), getByState(), getGrowth()])
      .then(([s, st, g]) => {
        setStats(s.data.data);
        setByState(st.data.data);
        setGrowth(g.data.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <PageLoader />;

  return (
    <div>
      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
        {STAT_CARDS.map(({ key, label, icon: Icon, color }) => (
          <div key={key} className="bg-white border border-gray-100 shadow-sm rounded-md p-3 md:p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xl md:text-2xl font-heading font-bold text-gray-800">{stats?.[key] ?? 0}</p>
                <p className="text-[10px] md:text-xs text-gray-500 font-body mt-0.5 leading-tight">{label}</p>
              </div>
              <div className={`w-8 h-8 md:w-9 md:h-9 rounded-md flex items-center justify-center shrink-0 ${color}`}>
                <Icon size={14} className="md:w-4 md:h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Monthly Growth Bar Chart */}
        <div className="bg-white border border-gray-100 shadow-sm rounded-md p-5">
          <h2 className="font-heading text-sm font-bold text-gray-700 mb-4">Monthly Growth</h2>
          {growth.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={growth} barSize={28}>
                <XAxis dataKey="month" tick={{ fontSize: 10, fontFamily: 'Inter' }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 10, fontFamily: 'Inter' }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ fontSize: '12px', fontFamily: 'Inter', borderRadius: '6px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} cursor={{fill: '#f9fafb'}} />
                <Bar dataKey="count" fill="#8B0000" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : <Empty />}
        </div>

        {/* State-wise Pie Chart */}
        <div className="bg-white border border-gray-100 shadow-sm rounded-md p-5">
          <h2 className="font-heading text-sm font-bold text-gray-700 mb-4">State-wise Members</h2>
          {byState.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={byState} dataKey="count" nameKey="state" cx="50%" cy="50%" outerRadius={90} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine fontSize={10}>
                  {byState.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ fontSize: '12px', fontFamily: 'Inter', borderRadius: '6px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              </PieChart>
            </ResponsiveContainer>
          ) : <Empty />}
        </div>
      </div>
    </div>
  );
}

function PageLoader() {
  return (
    <div className="h-64 flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-maroon-100 border-t-maroon-700 rounded-full animate-spin" />
    </div>
  );
}
function Empty() {
  return <p className="text-xs text-gray-400 font-body text-center py-8">Data not available</p>;
}
