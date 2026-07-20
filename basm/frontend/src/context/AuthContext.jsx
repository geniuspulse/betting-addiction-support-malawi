import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('basm_token');
    const userData = localStorage.getItem('basm_user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const data = await api.login({ email, password });
    localStorage.setItem('basm_token', data.token);
    localStorage.setItem('basm_user', JSON.stringify(data.user || { email }));
    setUser(data.user || { email });
    return data;
  };

  const register = async (name, email, password) => {
    const data = await api.register({ name, email, password });
    localStorage.setItem('basm_token', data.token);
    localStorage.setItem('basm_user', JSON.stringify(data.user || { email, name }));
    setUser(data.user || { email, name });
    return data;
  };

  const logout = () => {
    localStorage.removeItem('basm_token');
    localStorage.removeItem('basm_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
