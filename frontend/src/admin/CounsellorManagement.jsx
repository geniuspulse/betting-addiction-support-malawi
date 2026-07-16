import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import AdminLayout from './AdminLayout';

const CounsellorManagement = () => {
  const [counsellors, setCounsellors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCounsellor, setSelectedCounsellor] = useState(null);
  const [suspendReason, setSuspendReason] = useState('');
  const [showSuspendModal, setShowSuspendModal] = useState(false);

  const statusFilter = searchParams.get('status') || 'all';

  useEffect(() => {
    fetchCounsellors();
  }, [statusFilter]);

  const fetchCounsellors = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`/api/admin/counsellors?status=${statusFilter}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setCounsellors(data);
      } else {
        setError(data.message || 'Failed to fetch counsellors');
      }
    } catch (err) {
      setError('Network error. Failed to load counsellors.');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`/api/admin/counsellors/${id}/approve`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        fetchCounsellors();
        if (selectedCounsellor && selectedCounsellor._id === id) {
          setSelectedCounsellor(prev => ({ ...prev, status: 'approved' }));
        }
      } else {
        alert('Action failed');
      }
    } catch (err) {
      alert('Error performing action');
    }
  };

  const openSuspendModal = (counsellor) => {
    setSelectedCounsellor(counsellor);
    setShowSuspendModal(true);
  };

  const handleSuspend = async () => {
    if (!suspendReason.trim()) {
      alert('Please provide a suspension reason');
      return;
    }
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`/api/admin/counsellors/${selectedCounsellor._id}/suspend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ reason: suspendReason })
      });
      if (response.ok) {
        fetchCounsellors();
        setShowSuspendModal(false);
        setSuspendReason('');
        setSelectedCounsellor(null);
      } else {
        alert('Action failed');
      }
    } catch (err) {
      alert('Error performing action');
    }
  };

  const formatMWK = (num) => {
    return new Intl.NumberFormat('en-MW', { style: 'currency', currency: 'MWK', minimumFractionDigits: 0 }).format(num || 0);
  };

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 border-b pb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Counsellors Database</h2>
          <p className="text-sm text-gray-500">Manage registrations, approvals, and credentials</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex bg-white p-1 rounded-lg border shadow-sm self-start">
          {['all', 'pending', 'approved', 'suspended'].map((status) => (
            <button
              key={status}
              onClick={() => setSearchParams({ status })}
              className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all uppercase ${
                statusFilter === status
                  ? 'bg-slate-800 text-white'
                  : 'text-gray-600 hover:text-slate-800 hover:bg-gray-50'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Table Column */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border overflow-hidden">
          {loading ? (
            <div className="text-center py-12 text-slate-500 animate-pulse font-medium">Loading counsellors...</div>
          ) : error ? (
            <div className="p-6 text-red-600">{error}</div>
          ) : counsellors.length === 0 ? (
            <div className="text-center py-12 text-gray-400">No counsellors found in this category.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Counsellor</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Credentials</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Performance</th>
                    <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {counsellors.map((c) => {
                    const isPending = c.status === 'pending';
                    return (
                      <tr key={c._id} className={isPending ? 'bg-yellow-50/60' : ''}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-700">
                              {c.name.charAt(0)}
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-semibold text-gray-800">{c.name}</div>
                              <div className="text-xs text-gray-500">{c.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-700">{c.specialization || 'Clinical Counsellor'}</div>
                          <div className="text-xs text-gray-500">Lic: {c.licenseNumber || 'N/A'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            c.status === 'approved'
                              ? 'bg-green-100 text-green-800'
                              : c.status === 'suspended'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {c.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-xs font-semibold text-gray-700">Sessions: {c.totalSessions || 0}</div>
                          <div className="text-xs text-gray-500">Earnings: {formatMWK(c.totalEarnings)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-xs font-medium space-x-2">
                          <button
                            onClick={() => setSelectedCounsellor(c)}
                            className="text-teal-600 hover:text-teal-900 border border-teal-200 px-2 py-1 rounded hover:bg-teal-50"
                          >
                            View
                          </button>
                          {c.status === 'pending' && (
                            <button
                              onClick={() => handleApprove(c._id)}
                              className="text-green-600 hover:text-green-900 border border-green-200 px-2 py-1 rounded hover:bg-green-50"
                            >
                              Approve
                            </button>
                          )}
                          {c.status !== 'suspended' && (
                            <button
                              onClick={() => openSuspendModal(c)}
                              className="text-red-600 hover:text-red-900 border border-red-200 px-2 py-1 rounded hover:bg-red-50"
                            >
                              Suspend
                            </button>
                          )}
                          {c.status === 'suspended' && (
                            <button
                              onClick={() => handleApprove(c._id)}
                              className="text-indigo-600 hover:text-indigo-900 border border-indigo-200 px-2 py-1 rounded hover:bg-indigo-50"
                            >
                              Re-activate
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right: Details / Profile Preview */}
        <div className="bg-white rounded-xl shadow-sm border p-6 h-fit space-y-6">
          <h3 className="text-lg font-bold text-gray-800 border-b pb-3">Counsellor Profile</h3>
          {selectedCounsellor ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-14 h-14 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold text-xl">
                  {selectedCounsellor.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-base">{selectedCounsellor.name}</h4>
                  <p className="text-xs text-gray-500">{selectedCounsellor.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg text-xs">
                <div>
                  <span className="text-gray-500 block uppercase font-bold tracking-wider">License Number</span>
                  <span className="font-semibold text-gray-800">{selectedCounsellor.licenseNumber || 'Not available'}</span>
                </div>
                <div>
                  <span className="text-gray-500 block uppercase font-bold tracking-wider">Specialization</span>
                  <span className="font-semibold text-gray-800">{selectedCounsellor.specialization || 'Clinical'}</span>
                </div>
                <div>
                  <span className="text-gray-500 block uppercase font-bold tracking-wider">Joined Date</span>
                  <span className="font-semibold text-gray-800">
                    {selectedCounsellor.created_date ? new Date(selectedCounsellor.created_date).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block uppercase font-bold tracking-wider">Pending Payout</span>
                  <span className="font-semibold text-green-700">{formatMWK(selectedCounsellor.pendingPayout)}</span>
                </div>
              </div>

              <div>
                <h5 className="text-xs font-bold text-gray-600 uppercase mb-1">Qualifications & Bio</h5>
                <p className="text-xs text-gray-500 leading-relaxed bg-gray-50 p-3 rounded border">
                  {selectedCounsellor.qualifications || 'No bio or extra qualifications provided by user.'}
                </p>
              </div>

              {selectedCounsellor.status === 'suspended' && (
                <div className="bg-red-50 border-l-4 border-red-400 p-3 rounded text-xs text-red-800">
                  <span className="font-bold">Suspension Reason:</span> {selectedCounsellor.suspensionReason || 'No reason provided.'}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-400 text-xs">
              Select a counsellor from the list to preview credentials, status details, and performance metrics.
            </div>
          )}
        </div>
      </div>

      {/* Suspend Modal */}
      {showSuspendModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-gray-900">Suspend Counsellor Account</h3>
            <p className="text-sm text-gray-500">
              Are you sure you want to suspend <span className="font-semibold">{selectedCounsellor?.name}</span>? They will not be able to accept bookings or host sessions.
            </p>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Reason for Suspension</label>
              <textarea
                value={suspendReason}
                onChange={(e) => setSuspendReason(e.target.value)}
                rows={3}
                placeholder="e.g. Failure to comply with registration protocols or patient complaints."
                className="w-full text-sm border rounded p-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setShowSuspendModal(false);
                  setSuspendReason('');
                }}
                className="px-4 py-2 border rounded text-xs font-semibold text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSuspend}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded"
              >
                Confirm Suspension
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default CounsellorManagement;
