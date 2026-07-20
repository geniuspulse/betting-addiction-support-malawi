const BASE_URL = process.env.REACT_APP_API_URL || 'https://basm-backend.vercel.app';

const getToken = () => localStorage.getItem('basm_token');

const request = async (method, path, body = null) => {
  const headers = { 'Content-Type': 'application/json' };
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || data.message || 'Request failed');
  return data;
};

export const api = {
  // Auth
  register: (data) => request('POST', '/api/auth/register', data),
  login: (data) => request('POST', '/api/auth/login', data),
  
  // Counsellors
  getCounsellors: () => request('GET', '/api/counsellors'),
  bookSession: (data) => request('POST', '/api/sessions', data),
  
  // Check-ins
  createCheckin: (data) => request('POST', '/api/checkins', data),
  getCheckinHistory: () => request('GET', '/api/checkins/history'),
  getStreak: () => request('GET', '/api/checkins/streak'),
  
  // Wallet
  getWallet: () => request('GET', '/api/wallet'),
  updateWallet: (data) => request('POST', '/api/wallet/update', data),
  
  // Assessment
  submitAssessment: (data) => request('POST', '/api/assessment', data),
  
  // Achievements
  getAchievements: () => request('GET', '/api/achievements'),
  
  // Community
  getPosts: () => request('GET', '/api/community'),
  createPost: (data) => request('POST', '/api/community', data),
  
  // Training  
  getCourses: () => request('GET', '/api/training'),
  enrollCourse: (courseId) => request('POST', `/api/training/${courseId}/enroll`),
};

export default api;
