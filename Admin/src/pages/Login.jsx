// src/pages/Login.jsx
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { User, Shield, Mail, Lock, UserPlus, KeyRound } from 'lucide-react';

export default function Login() {
  const { login, register, changePassword } = useAuth();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState(location.state?.tab || 'signin');
  const [role, setRole] = useState('user');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    oldPassword: '',
    newPassword: '',
  });

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (pwd) => pwd.length >= 6; // ← Easier for testing (change back later if needed)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, name, oldPassword, newPassword } = formData;

    console.log('Form submitted → tab:', activeTab, 'role:', role);

    if (activeTab === 'signin') {
      console.log('Starting sign-in validation...');
      if (!email || !password || !role) return toast.error('Please fill all fields!');
      if (!validateEmail(email)) return toast.error('Invalid email format!');
      if (!validatePassword(password)) return toast.error('Password must be at least 6 characters!');

      console.log('Sign-in validation passed – calling login...');
      const result = await login(email, password, role);
      if (result.success) {
        toast.success(`Welcome ${result.user?.name || role}, login successful!`);
      } else {
        if (result.message === 'Invalid credentials!') {
          toast.error('Password incorrect or user not found');
        } else {
          toast.error(result.message || 'Login failed!');
        }
      }
    }
    else if (activeTab === 'signup') {
      console.log('Starting signup validation...');
      if (!email || !password || !name || !role) return toast.error('Please fill all fields!');
      if (!validateEmail(email)) return toast.error('Invalid email format!');
      if (!validatePassword(password)) return toast.error('Password must be at least 6 characters!');

      console.log('Signup validation passed – calling register...');
      const result = await register(email, password, name, role);
      console.log('Register returned:', result);

      if (result && result.success) {
        toast.success('Signup successful!');
        setActiveTab('signin');
        setFormData({ email: '', password: '', name: '', oldPassword: '', newPassword: '' });
      } else {
        if (result?.message === 'User already exists!') {
          toast.error('User already existed');
        } else {
          toast.error(result?.message || 'Signup failed – check console');
        }
      }
    }
    else if (activeTab === 'changepw') {
      // Your change password logic (unchanged)
      if (!email || !oldPassword || !newPassword) return toast.error('Please fill all fields!');
      if (!validateEmail(email)) return toast.error('Invalid email format!');
      if (!validatePassword(newPassword)) return toast.error('New password must be at least 6 characters!');

      const success = await changePassword(email, oldPassword, newPassword);
      if (success) {
        toast.success('Password changed successfully!');
        setActiveTab('signin');
      } else {
        toast.error('Old password incorrect!');
      }
    }
  };

  const updateForm = (key, value) => setFormData(prev => ({ ...prev, [key]: value }));

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      animation: 'fadeIn 0.8s ease-in'
    }}>
      {/* Your existing style and JSX – no change needed below */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .glass-card { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.2); }
        .tab-btn { transition: all 0.3s; }
        .tab-btn.active { background: rgba(255,255,255,0.2); transform: scale(1.05); }
        .role-toggle { transition: transform 0.2s; }
        .role-toggle:hover { transform: scale(1.1); }
      `}</style>

      <div className="card glass-card shadow-lg border-0 p-4" style={{ maxWidth: '450px', width: '100%', borderRadius: '20px' }}>
        <div className="text-center mb-4">
          <h2 className="text-white mb-2">Welcome to Flowly</h2>
          <p className="text-white-50">Sign in to your {role === 'admin' ? 'admin' : 'user'} account</p>
        </div>

        <div className="d-flex justify-content-center mb-4">
          <div className="btn-group role-toggle">
            <button type="button" className={`btn btn-outline-light rounded-pill px-4 ${role === 'user' ? 'active' : ''}`} onClick={() => setRole('user')}>
              <User size={16} className="me-1" /> User
            </button>
            <button type="button" className={`btn btn-outline-light rounded-pill px-4 ${role === 'admin' ? 'active' : ''}`} onClick={() => setRole('admin')}>
              <Shield size={16} className="me-1" /> Admin
            </button>
          </div>
        </div>

        <ul className="nav nav-pills nav-fill mb-4 flex-wrap justify-content-center" style={{ gap: '0.5rem' }}>
          <li className="nav-item"><button className={`tab-btn nav-link rounded-pill ${activeTab === 'signin' ? 'active text-white' : 'text-white-50'}`} onClick={() => setActiveTab('signin')}>Sign In</button></li>
          <li className="nav-item"><button className={`tab-btn nav-link rounded-pill ${activeTab === 'signup' ? 'active text-white' : 'text-white-50'}`} onClick={() => setActiveTab('signup')}>Sign Up</button></li>
          <li className="nav-item"><button className={`tab-btn nav-link rounded-pill ${activeTab === 'changepw' ? 'active text-white' : 'text-white-50'}`} onClick={() => setActiveTab('changepw')}>Change Password</button></li>
        </ul>

        <form onSubmit={handleSubmit}>
          {/* Your existing form fields – no change */}
          {activeTab === 'signin' && (
            <>
              <div className="mb-3">
                <label className="form-label text-white">Email</label>
                <div className="input-group">
                  <span className="input-group-text bg-transparent border-0 text-white"><Mail size={16} /></span>
                  <input type="email" className="form-control bg-transparent border-0 text-white" placeholder="Enter email" value={formData.email} onChange={(e) => updateForm('email', e.target.value)} required />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label text-white">Password</label>
                <div className="input-group">
                  <span className="input-group-text bg-transparent border-0 text-white"><Lock size={16} /></span>
                  <input type="password" className="form-control bg-transparent border-0 text-white" placeholder="Enter password" value={formData.password} onChange={(e) => updateForm('password', e.target.value)} required />
                </div>
              </div>
            </>
          )}

          {activeTab === 'signup' && (
            <>
              <div className="mb-3">
                <label className="form-label text-white">Name</label>
                <input type="text" className="form-control bg-transparent border-0 text-white" placeholder="Full Name" value={formData.name} onChange={(e) => updateForm('name', e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label text-white">Email</label>
                <div className="input-group">
                  <span className="input-group-text bg-transparent border-0 text-white"><Mail size={16} /></span>
                  <input type="email" className="form-control bg-transparent border-0 text-white" placeholder="Enter email" value={formData.email} onChange={(e) => updateForm('email', e.target.value)} required />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label text-white">Password</label>
                <div className="input-group">
                  <span className="input-group-text bg-transparent border-0 text-white"><Lock size={16} /></span>
                  <input type="password" className="form-control bg-transparent border-0 text-white" placeholder="Create strong password" value={formData.password} onChange={(e) => updateForm('password', e.target.value)} required />
                </div>
              </div>
            </>
          )}

          {activeTab === 'changepw' && (
            <>
              <div className="mb-3">
                <label className="form-label text-white">Email</label>
                <div className="input-group">
                  <span className="input-group-text bg-transparent border-0 text-white"><Mail size={16} /></span>
                  <input type="email" className="form-control bg-transparent border-0 text-white" placeholder="Enter email" value={formData.email} onChange={(e) => updateForm('email', e.target.value)} required />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label text-white">Old Password</label>
                <div className="input-group">
                  <span className="input-group-text bg-transparent border-0 text-white"><Lock size={16} /></span>
                  <input type="password" className="form-control bg-transparent border-0 text-white" placeholder="Current password" value={formData.oldPassword} onChange={(e) => updateForm('oldPassword', e.target.value)} required />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label text-white">New Password</label>
                <div className="input-group">
                  <span className="input-group-text bg-transparent border-0 text-white"><KeyRound size={16} /></span>
                  <input type="password" className="form-control bg-transparent border-0 text-white" placeholder="New strong password" value={formData.newPassword} onChange={(e) => updateForm('newPassword', e.target.value)} required />
                </div>
              </div>
            </>
          )}

          <button type="submit" className="btn btn-primary w-100 rounded-pill py-2 fw-bold mb-3" style={{ background: 'linear-gradient(45deg, #667eea, #764ba2)' }}>
            {activeTab === 'signin' ? 'Sign In' : activeTab === 'signup' ? 'Sign Up' : 'Change Password'}
          </button>
        </form>

        <div className="text-center">
          <small className="text-white-50">
            {activeTab === 'signin' && <span>New here? <button type="button" className="btn btn-link p-0 text-white" onClick={() => setActiveTab('signup')}>Sign Up</button></span>}
            {activeTab === 'signup' && <span>Have account? <button type="button" className="btn btn-link p-0 text-white" onClick={() => setActiveTab('signin')}>Sign In</button></span>}
            {activeTab === 'changepw' && <span>Back to <button type="button" className="btn btn-link p-0 text-white" onClick={() => setActiveTab('signin')}>Sign In</button></span>}
          </small>
        </div>
      </div>
    </div>
  );
}