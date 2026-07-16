import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const AdminLayout = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    const adminData = localStorage.getItem('admin_user');
    if (!token) {
      navigate('/admin/login');
    } else if (adminData) {
      setAdmin(JSON.parse(adminData));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: '📊' },
    { name: 'Counsellors', path: '/admin/counsellors', icon: '🧑‍⚕️' },
    { name: 'Users', path: '/admin/users', icon: '👥' },
    { name: 'Sessions', path: '/admin/sessions', icon: '📅' },
    { name: 'Subscriptions', path: '/admin/subscriptions', icon: '💳' },
    { name: 'Community', path: '/admin/community', icon: '💬' },
    { name: 'Reports', path: '/admin/reports', icon: '📈' }
  ];

  if (!localStorage.getItem('admin_token')) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-slate-800 text-white flex flex-col justify-between">
        <div>
          <div className="p-5 flex items-center justify-center border-b border-slate-700">
            <span className="text-xl font-bold tracking-wider text-teal-400">BASM Admin</span>
          </div>
          <nav className="mt-6 px-4 space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? 'bg-teal-600 text-white font-semibold'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-700 text-xs text-slate-400 text-center">
          &copy; 2026 BASM Admin Panel
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 z-10">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-semibold text-gray-800">
              {navItems.find((item) => item.path === location.pathname)?.name || 'Admin Panel'}
            </h1>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold">
                {admin?.email ? admin.email.charAt(0).toUpperCase() : 'A'}
              </div>
              <span className="text-sm font-medium text-gray-700">{admin?.email || 'Admin User'}</span>
            </div>
            <button
              onClick={handleLogout}
              className="text-sm bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-4 py-2 rounded-lg border border-red-200 transition-colors"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto p-8 bg-gray-50">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
