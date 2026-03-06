// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      try {
        const payload = JSON.parse(atob(savedToken.split('.')[1]));
        if (payload.exp * 1000 > Date.now()) {
          setToken(savedToken);
          setUser(payload);
        } else {
          logout();
        }
      } catch (err) {
        console.warn('Invalid token format');
        logout();
      }
    }
    setLoading(false);
  }, [navigate]);

  const login = async (email, password, role) => {
    console.log('Login called with:', { email, role }); // debug
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role })
      });
      console.log('Login response status:', res.status); // debug

      const data = await res.json();
      console.log('Login response data:', data); // debug

      if (!res.ok) throw new Error(data.message || 'Login failed');

      localStorage.setItem('token', data.token);
      setToken(data.token);
      setUser(data.user);
      navigate('/dashboard');
      return { success: true, user: data.user };
    } catch (err) {
      console.error('Login error:', err);
      return { success: false, message: err.message || 'Login failed' };
    }
  };

  const register = async (email, password, name, role) => {
    console.log('Register function called with:', { email, name, role }); // Debug log
    try {
      console.log('Attempting fetch to backend...'); // Debug
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role })
      });
      console.log('Fetch response status:', res.status); // Debug
      const data = await res.json();
      console.log('Fetch response data:', data); // Debug
      if (!res.ok) {
        throw new Error(data.message || 'Signup failed');
      }
      return { success: true, message: 'Registered successfully! Please sign in.' };
    } catch (err) {
      console.error('Register fetch error:', err); // Debug
      return { success: false, message: err.message || 'Network or server error' };
    }
  };

  const changePassword = async (email, oldPassword, newPassword) => {
    console.log('Change password called for:', email);
    try {
      const res = await fetch('http://localhost:5000/api/auth/change-password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, oldPassword, newPassword })
      });
      const data = await res.json();

      if (!res.ok) {
        console.error('Password change failed:', data.message);
        return false;
      }
      return true;
    } catch (err) {
      console.error('Password change error:', err);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,          // ← Now included
    changePassword,
    logout,
    isAuthenticated: !!token,
    isAdmin: user?.role === 'admin'
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}