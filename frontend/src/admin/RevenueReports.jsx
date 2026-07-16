import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';

const RevenueReports = () => {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch('/api/admin/revenue', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setReportData(data);
      } else {
        setError(data.message || 'Failed to fetch revenue analytics');
      }
    } catch (err) {
      setError('Network error. Failed to load revenue reports.');
    } finally {
      setLoading(false);
    }
  };

  const handleProcessPayout = async (counsellorId, amount) => {
    if (!window.confirm(`Are you sure you want to process payout of ${formatMWK(amount)} for this counsellor?`)) return;

    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`/api/admin/payouts/${counsellorId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ amountMWK: amount })
      });
      if (response.ok) {
        alert('Payout processed and logged successfully!');
        fetchReport();
      } else {
        alert('Action failed');
      }
    } catch (err) {
      alert('Error processing payout');
    }
  };

  const formatMWK = (num) => {
    return new Intl.NumberFormat('en-MW', { style: 'currency', currency: 'MWK', minimumFractionDigits: 0 }).format(num || 0);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-12 text-slate-500 animate-pulse font-medium">Computing financial reports...</div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="bg-red-50 p-6 text-red-600 rounded-lg">{error}</div>
      </AdminLayout>
    );
  }

  // Find max value for bar scale
  const months = reportData?.monthlyRevenue || [];
  const maxRevenue = months.length > 0 ? Math.max(...months.map(m => m.total)) : 1;

  return (
    <AdminLayout>
      <div className="border-b pb-4 mb-6">
        <h2 className="text-xl font-bold text-gray-800">Financial Revenue & Payout Reports</h2>
        <p className="text-sm text-gray-500">Track subscriptions, session margins, and pay out certified counsellors</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Monthly Revenue Chart + Earnings table */}
        <div className="lg:col-span-2 space-y-6">
          {/* SVG Bar Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-6">Monthly Gross Revenue Distribution</h3>
            <div className="flex h-64 items-end space-x-6 pt-4 border-b pb-2">
              {months.map((m, index) => {
                const heightPercent = (m.total / maxRevenue) * 100;
                return (
                  <div key={index} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                    {/* Tooltip on hover */}
                    <div className="absolute -top-10 scale-0 group-hover:scale-100 transition-transform bg-slate-800 text-white text-[10px] font-semibold px-2 py-1 rounded shadow whitespace-nowrap z-10">
                      Sub: {formatMWK(m.subscriptions)} | Sess: {formatMWK(m.sessions)}
                    </div>
                    {/* Visual bar stacked */}
                    <div className="w-full flex flex-col justify-end rounded-t-sm overflow-hidden" style={{ height: `${heightPercent || 5}%` }}>
                      <div className="bg-teal-500 w-full" style={{ height: `${(m.sessions / (m.total || 1)) * 100}%` }} title="Session revenue" />
                      <div className="bg-indigo-600 w-full" style={{ height: `${(m.subscriptions / (m.total || 1)) * 100}%` }} title="Subscription revenue" />
                    </div>
                    <span className="text-[10px] font-bold text-gray-500 mt-2 rotate-12 md:rotate-0">{m.month}</span>
                  </div>
                );
              })}
              {months.length === 0 && (
                <div className="w-full text-center py-12 text-gray-400 text-xs self-center">No data available for chart.</div>
              )}
            </div>
            {/* Legend */}
            <div className="flex justify-center space-x-6 mt-4 text-xs">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 bg-indigo-600 rounded-sm" />
                <span className="text-gray-600">Premium Subscriptions</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 bg-teal-500 rounded-sm" />
                <span className="text-gray-600">Therapy Booking Fees</span>
              </div>
            </div>
          </div>

          {/* Top Earning Counsellors */}
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="p-5 border-b">
              <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Top Earning Therapy Partners</h3>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Counsellor</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Total Sessions</th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase">All-time Earnings</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {(reportData?.topCounsellors || []).map((tc, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-4 whitespace-nowrap text-xs font-bold text-slate-800">{tc.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-600">{tc.sessionsCount} sessions completed</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-xs font-black text-gray-900">{formatMWK(tc.totalEarnings)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Pending Payouts Action Panel */}
        <div className="bg-white rounded-xl shadow-sm border p-6 h-fit space-y-4">
          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider border-b pb-3">Processing Pending Payouts</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Payout requests should be cleared monthly after verifying matching sessions. Processing resets the counsellor's pendingPayout field.
          </p>

          <div className="space-y-3 divide-y divide-gray-100 pt-2">
            {(reportData?.pendingPayouts || []).map((po) => (
              <div key={po.counsellorId} className="pt-3 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-gray-800">{po.name}</h4>
                  <p className="text-[10px] text-gray-500">License ID: {po.licenseNumber || 'Unspecified'}</p>
                </div>
                <div className="text-right">
                  <span className="block text-xs font-black text-green-700">{formatMWK(po.amount)}</span>
                  <button
                    onClick={() => handleProcessPayout(po.counsellorId, po.amount)}
                    className="text-[10px] bg-teal-600 hover:bg-teal-700 text-white font-bold px-2 py-1 rounded mt-1"
                  >
                    Process Payout
                  </button>
                </div>
              </div>
            ))}
            {(!reportData?.pendingPayouts || reportData.pendingPayouts.length === 0) && (
              <div className="text-center py-6 text-gray-400 text-xs">All therapist accounts have been paid out!</div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default RevenueReports;
