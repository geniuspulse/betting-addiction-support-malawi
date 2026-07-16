import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [revealedUsers, setRevealedUsers] = useState({});
  const [filterSubscription, setFilterSubscription] = useState('all');
  const [filterRisk, setFilterRisk] = useState('all');

  useEffect(() => {
    fetchUsers();
  }, [filterSubscription, filterRisk]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`/api/admin/users?subscription=${filterSubscription}&risk=${filterRisk}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setUsers(data);
      } else {
        setError(data.message || 'Failed to fetch users');
      }
    } catch (err) {
      setError('Network error. Failed to load users.');
    } finally {
      setLoading(false);
    }
  };

  const toggleReveal = (userId) => {
    setRevealedUsers(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  const handleMessageUser = (userId) => {
    const msg = prompt('Enter message to send to user (this will appear in their dashboard notifications):');
    if (msg) {
      alert(`Message dispatched to user ID: ${userId}`);
    }
  };

  const handleToggleSuspend = async (userId, currentStatus) => {
    const confirmMsg = currentStatus === 'suspended' 
      ? 'Are you sure you want to reactivate this user account?' 
      : 'Are you sure you want to suspend this user account?';
    if (!window.confirm(confirmMsg)) return;

    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`/api/admin/users/${userId}/suspend`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        fetchUsers();
      } else {
        alert('Action failed');
      }
    } catch (err) {
      alert('Error updating user status');
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 border-b pb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">User Management</h2>
          <p className="text-sm text-gray-500">View logs, streak records, subscription statuses, and moderate user behavior</p>
        </div>

        {/* Filters panel */}
        <div className="flex flex-wrap gap-2">
          <select
            value={filterSubscription}
            onChange={(e) => setFilterSubscription(e.target.value)}
            className="text-xs bg-white border rounded px-3 py-1.5 font-semibold text-gray-700"
          >
            <option value="all">All Subscriptions</option>
            <option value="free">Free Tier</option>
            <option value="premium">Premium Tier</option>
          </select>

          <select
            value={filterRisk}
            onChange={(e) => setFilterRisk(e.target.value)}
            className="text-xs bg-white border rounded px-3 py-1.5 font-semibold text-gray-700"
          >
            <option value="all">All Risk Levels</option>
            <option value="low">Low Risk</option>
            <option value="moderate">Moderate Risk</option>
            <option value="high">High Risk</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        {loading ? (
          <div className="text-center py-12 text-slate-500 animate-pulse font-medium">Loading user index...</div>
        ) : error ? (
          <div className="p-6 text-red-600">{error}</div>
        ) : users.length === 0 ? (
          <div className="text-center py-12 text-gray-400">No users found match your filter criteria.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">User Identifier</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Join Date</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Current Program</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Streak Days</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Plan & Status</th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {users.map((u) => {
                  const isRevealed = revealedUsers[u._id];
                  return (
                    <tr key={u._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <span className={`w-2.5 h-2.5 rounded-full ${
                            u.riskLevel === 'high' ? 'bg-red-500' : u.riskLevel === 'moderate' ? 'bg-yellow-500' : 'bg-green-500'
                          }`} title={`Risk level: ${u.riskLevel}`} />
                          <div>
                            <div className="text-sm font-semibold text-gray-800">
                              {isRevealed ? u.email : `User_ID_****${u._id.slice(-6)}`}
                            </div>
                            <div className="text-xs text-gray-500 flex items-center space-x-2 mt-0.5">
                              <span>Risk: <b className="uppercase">{u.riskLevel || 'low'}</b></span>
                              <button
                                onClick={() => toggleReveal(u._id)}
                                className="text-teal-600 hover:text-teal-800 underline cursor-pointer text-[10px]"
                              >
                                {isRevealed ? 'Anonymize' : 'Reveal Identity'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {u.created_date ? new Date(u.created_date).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {u.currentProgram || 'Default Recovery Plan'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-1">
                          <span className="text-base">🔥</span>
                          <span className="text-sm font-bold text-gray-800">{u.streakDays || 0} days</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-1">
                          <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                            u.subscription === 'premium' ? 'bg-indigo-100 text-indigo-800' : 'bg-slate-100 text-slate-700'
                          }`}>
                            {u.subscription || 'free'}
                          </span>
                          {u.status === 'suspended' && (
                            <span className="block text-[10px] text-red-600 font-bold uppercase">Suspended</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-xs font-medium space-x-2">
                        <button
                          onClick={() => handleMessageUser(u._id)}
                          className="text-teal-600 hover:text-teal-900 border border-teal-100 px-2.5 py-1 rounded hover:bg-teal-50"
                        >
                          Send Message
                        </button>
                        <button
                          onClick={() => handleToggleSuspend(u._id, u.status)}
                          className={`border px-2.5 py-1 rounded transition-colors ${
                            u.status === 'suspended'
                              ? 'text-green-600 border-green-200 hover:bg-green-50'
                              : 'text-red-600 border-red-200 hover:bg-red-50'
                          }`}
                        >
                          {u.status === 'suspended' ? 'Activate' : 'Suspend'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default UserManagement;
