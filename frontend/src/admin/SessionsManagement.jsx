import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';

const SessionsManagement = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [revenue, setRevenue] = useState({ gross: 0, platform: 0, payouts: 0 });

  useEffect(() => {
    fetchSessions();
  }, [filterStatus, startDate, endDate]);

  const fetchSessions = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('admin_token');
      let query = `?status=${filterStatus}`;
      if (startDate) query += `&startDate=${startDate}`;
      if (endDate) query += `&endDate=${endDate}`;

      const response = await fetch(`/api/admin/sessions${query}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setSessions(data.sessions || []);
        setRevenue(data.revenueBreakdown || { gross: 0, platform: 0, payouts: 0 });
      } else {
        setError(data.message || 'Failed to fetch sessions');
      }
    } catch (err) {
      setError('Network error. Failed to load sessions.');
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = () => {
    // Stub CSV export function
    if (sessions.length === 0) {
      alert('No sessions to export');
      return;
    }
    const headers = ['Session ID', 'Date', 'User ID', 'Counsellor', 'Type', 'Status', 'Amount (MWK)'];
    const rows = sessions.map(s => [
      s._id,
      s.date ? new Date(s.date).toLocaleDateString() : '',
      s.userId ? `...${s.userId.slice(-6)}` : 'Anonymous',
      s.counsellorName || '',
      s.type || 'Individual',
      s.status || '',
      s.amount || 0
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `basm-sessions-export-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatMWK = (num) => {
    return new Intl.NumberFormat('en-MW', { style: 'currency', currency: 'MWK', minimumFractionDigits: 0 }).format(num || 0);
  };

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 border-b pb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Sessions Booking Logs</h2>
          <p className="text-sm text-gray-500">Monitor counseling appointments, financial payouts, and scheduling statuses</p>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center space-x-2 text-xs bg-slate-800 text-white font-semibold px-4 py-2 rounded-lg hover:bg-slate-700 transition shadow"
        >
          <span>📥 Export to CSV</span>
        </button>
      </div>

      {/* Revenue Breakdown mini cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Gross Booking Revenue</p>
          <p className="text-2xl font-bold text-slate-800 mt-1">{formatMWK(revenue.gross)}</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Platform Share (Fees)</p>
          <p className="text-2xl font-bold text-teal-600 mt-1">{formatMWK(revenue.platform)}</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Counsellor Payout Pool</p>
          <p className="text-2xl font-bold text-indigo-600 mt-1">{formatMWK(revenue.payouts)}</p>
        </div>
      </div>

      {/* Filter and Date selection panel */}
      <div className="bg-white p-4 rounded-xl shadow-sm border flex flex-wrap gap-4 items-center">
        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Status</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-xs bg-gray-50 border rounded px-3 py-1.5 font-semibold text-gray-700"
          >
            <option value="all">All Booking Statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="text-xs bg-gray-50 border rounded px-3 py-1.5 font-semibold text-gray-700"
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="text-xs bg-gray-50 border rounded px-3 py-1.5 font-semibold text-gray-700"
          />
        </div>
      </div>

      {/* Main sessions table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        {loading ? (
          <div className="text-center py-12 text-slate-500 animate-pulse font-medium">Querying session records...</div>
        ) : error ? (
          <div className="p-6 text-red-600">{error}</div>
        ) : sessions.length === 0 ? (
          <div className="text-center py-12 text-gray-400">No session bookings match the filter criteria.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date & Time</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Patient ID</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Counsellor</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Session Type</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Amount Paid</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {sessions.map((s) => (
                  <tr key={s._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-xs font-semibold text-gray-800">
                      {s.date ? new Date(s.date).toLocaleDateString() : 'Unknown Date'}
                      <span className="block text-[10px] font-normal text-gray-400 mt-0.5">{s.time || '10:00 AM'}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                      {s.userId ? `User_ID_****${s.userId.slice(-6)}` : 'Anonymized'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs font-semibold text-gray-700">
                      {s.counsellorName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                      {s.type || 'Standard Individual Session'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        s.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : s.status === 'cancelled'
                          ? 'bg-red-100 text-red-800'
                          : s.status === 'confirmed'
                          ? 'bg-indigo-100 text-indigo-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-xs font-bold text-gray-900">
                      {formatMWK(s.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default SessionsManagement;
