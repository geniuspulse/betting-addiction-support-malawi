import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';

const CommunityModeration = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFlaggedPosts();
  }, []);

  const fetchFlaggedPosts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch('/api/admin/community', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setPosts(data);
      } else {
        setError(data.message || 'Failed to fetch community queue');
      }
    } catch (err) {
      setError('Network error. Failed to load moderation dashboard.');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (postId) => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`/api/admin/community/${postId}/approve`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        setPosts(prev => prev.filter(p => p._id !== postId));
      } else {
        alert('Action failed');
      }
    } catch (err) {
      alert('Error updating post');
    }
  };

  const handleRemove = async (postId) => {
    if (!window.confirm('Are you sure you want to permanently delete/soft-delete this post?')) return;

    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`/api/admin/community/${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        setPosts(prev => prev.filter(p => p._id !== postId));
      } else {
        alert('Action failed');
      }
    } catch (err) {
      alert('Error removing post');
    }
  };

  return (
    <AdminLayout>
      <div className="border-b pb-4 mb-6">
        <h2 className="text-xl font-bold text-gray-800">Community Moderation Dashboard</h2>
        <p className="text-sm text-gray-500">Review flagged user posts, clear false alarms, and maintain a supportive recovery environment</p>
      </div>

      <div className="bg-white rounded-xl border shadow-sm">
        <div className="p-5 border-b bg-gray-50/50 flex items-center justify-between">
          <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">Reports & Moderation Queue</h3>
          <span className="bg-red-100 text-red-800 px-2.5 py-0.5 rounded-full text-xs font-bold">
            {posts.length} pending actions
          </span>
        </div>

        {loading ? (
          <div className="text-center py-12 text-slate-500 animate-pulse font-medium">Scanning forums queue...</div>
        ) : error ? (
          <div className="p-6 text-red-600">{error}</div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12 text-gray-400 text-sm">
            🎉 Great job! The moderation queue is currently empty.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {posts.map((post) => (
              <div key={post._id} className="p-6 flex flex-col md:flex-row md:items-start md:justify-between space-y-4 md:space-y-0 md:space-x-6 hover:bg-slate-50/40 transition">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center space-x-3 text-xs">
                    <span className="font-bold text-slate-800">
                      Author ID: User_ID_****{post.userId ? post.userId.slice(-6) : 'Anonymous'}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500">
                      Posted: {post.created_date ? new Date(post.created_date).toLocaleDateString() : 'Unknown'}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="bg-red-50 text-red-700 font-extrabold px-1.5 py-0.5 rounded text-[10px]">
                      ⚠️ Flagged: {post.flagsCount || 1} times
                    </span>
                  </div>

                  <p className="text-sm text-gray-700 font-normal leading-relaxed bg-white border p-3 rounded shadow-sm">
                    {post.content}
                  </p>

                  {post.flagReason && (
                    <div className="text-xs text-red-600 flex items-center space-x-1">
                      <span className="font-bold">Latest flag reason:</span>
                      <span>"{post.flagReason}"</span>
                    </div>
                  )}
                </div>

                {/* Moderation Actions */}
                <div className="flex md:flex-col space-x-2 md:space-x-0 md:space-y-2 self-center md:self-start whitespace-nowrap">
                  <button
                    onClick={() => handleApprove(post._id)}
                    className="flex-1 bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 text-xs font-bold px-4 py-2 rounded-lg transition"
                  >
                    Approve (Clear Flags)
                  </button>
                  <button
                    onClick={() => handleRemove(post._id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition"
                  >
                    Remove Content
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default CommunityModeration;
