import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('admin_token');
        const response = await fetch('/api/admin/dashboard', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.status === 401 || response.status === 403) {
          navigate('/admin/login');
          return;
        }
        const data = await response.json();
        if (response.ok) {
          setStats(data);
        } else {
          setError(data.message || 'Failed to fetch dashboard statistics');
        }
      } catch (err) {
        setError('Network error. Failed to load dashboard.');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [navigate]);

  const formatMWK = (num) => {
    return new Intl.NumberFormat('en-MW', { style: 'currency', currency: 'MWK', minimumFractionDigits: 0 }).format(num || 0);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg font-semibold text-slate-600 animate-pulse">Loading dashboard...</div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
          <p className="text-red-700 font-medium">{error}</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Users */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-3 rounded-lg bg-teal-50 text-teal-600 text-2xl">👥</div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Users</p>
            <p className="text-2xl font-bold text-gray-800">{stats?.users?.total || 0}</p>
            <p className="text-xs text-green-600 font-medium mt-1">
              Active (7d): {stats?.users?.active7d || 0}
            </p>
          </div>
        </div>

        {/* Total Counsellors */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-3 rounded-lg bg-indigo-50 text-indigo-600 text-2xl">🧑‍⚕️</div>
          <div>
            <p className="text-sm font-medium text-gray-500">Counsellors</p>
            <p className="text-2xl font-bold text-gray-800">
              {stats?.counsellors?.total || 0}
            </p>
            <div className="flex space-x-2 text-xs mt-1">
              <span className="text-yellow-600 font-medium">Pending: {stats?.counsellors?.pending || 0}</span>
              <span className="text-green-600 font-medium">Approved: {stats?.counsellors?.approved || 0}</span>
            </div>
          </div>
        </div>

        {/* Sessions & Revenue */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-3 rounded-lg bg-emerald-50 text-emerald-600 text-2xl">💰</div>
          <div>
            <p className="text-sm font-medium text-gray-500">Revenue (This Month)</p>
            <p className="text-2xl font-bold text-gray-800">{formatMWK(stats?.revenueThisMonth)}</p>
            <p className="text-xs text-gray-500 mt-1">
              Sessions: {stats?.sessionsThisMonth || 0} booked
            </p>
          </div>
        </div>

        {/* Recovery Metrics */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-3 rounded-lg bg-orange-50 text-orange-600 text-2xl">🔥</div>
          <div>
            <p className="text-sm font-medium text-gray-500">Bet-Free Days Logged</p>
            <p className="text-2xl font-bold text-gray-800">{stats?.totalBetFreeDays || 0}</p>
            <p className="text-xs text-gray-500 mt-1">
              Premium Users: {stats?.premiumSubscribers || 0}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions Panel */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
          <h3 className="text-lg font-bold text-gray-800 border-b pb-3">Quick Actions</h3>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/admin/counsellors?status=pending')}
              className="w-full flex items-center justify-between px-4 py-3 bg-yellow-50 hover:bg-yellow-100 text-yellow-800 rounded-lg transition-colors border border-yellow-200"
            >
              <span className="font-semibold text-sm">Review Pending Counsellors</span>
              <span className="bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded-full text-xs font-bold">
                {stats?.counsellors?.pending || 0}
              </span>
            </button>
            <button
              onClick={() => navigate('/admin/community')}
              className="w-full flex items-center justify-between px-4 py-3 bg-red-50 hover:bg-red-100 text-red-800 rounded-lg transition-colors border border-red-200"
            >
              <span className="font-semibold text-sm">Review Flagged Community Posts</span>
              <span className="bg-red-200 text-red-800 px-2 py-0.5 rounded-full text-xs font-bold">
                {stats?.flaggedPostsCount || 0}
              </span>
            </button>
            <button
              onClick={() => navigate('/admin/reports')}
              className="w-full flex items-center justify-between px-4 py-3 bg-teal-50 hover:bg-teal-100 text-teal-800 rounded-lg transition-colors border border-teal-200"
            >
              <span className="font-semibold text-sm">Process Pending Payouts</span>
              <span className="text-xs font-medium">Click to view</span>
            </button>
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
          <h3 className="text-lg font-bold text-gray-800 border-b pb-3 mb-4">Recent Activity</h3>
          <div className="flow-root">
            <ul className="-mb-8">
              {(stats?.recentActivity || []).map((activity, idx) => (
                <li key={activity.id || idx}>
                  <div className="relative pb-8">
                    {idx !== stats.recentActivity.length - 1 ? (
                      <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center ring-8 ring-white text-lg">
                          {activity.type === 'signup' ? '👤' : activity.type === 'booking' ? '📅' : activity.type === 'subscription' ? '💳' : '📢'}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-gray-600">{activity.description}</p>
                        </div>
                        <div className="text-right text-xs whitespace-nowrap text-gray-500 font-medium">
                          {activity.time}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
              {(!stats?.recentActivity || stats.recentActivity.length === 0) && (
                <div className="text-center py-6 text-gray-500 text-sm">No recent activity.</div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
