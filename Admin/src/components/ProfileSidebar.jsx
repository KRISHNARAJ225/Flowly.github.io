// src/components/ProfileSidebar.jsx (updated)
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogIn, Key, LogOut, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function ProfileSidebar({ isOpen, onClose }) {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <div className="position-fixed top-0 end-0 h-100 bg-dark text-white shadow-lg" style={{ width: '280px', zIndex: 1050, transform: 'translateX(0)', transition: 'transform 0.3s ease-in-out' }} ref={sidebarRef}>
      <div className="d-flex justify-content-between align-items-center p-3 border-bottom border-secondary">
        <h5 className="mb-0">My Account</h5>
        <button className="btn btn-link text-white p-0" onClick={onClose} aria-label="Close profile menu">
          <X size={24} />
        </button>
      </div>

      <div className="p-2">
        {isAuthenticated ? (
          <>
            <Link to="/profile" className="d-flex align-items-center gap-3 text-white text-decoration-none p-3 rounded hover-bg-secondary" onClick={onClose}>
              <User size={20} />
              <span>Profile</span>
            </Link>
            <Link to="/login" state={{ tab: 'changepw' }} className="d-flex align-items-center gap-3 text-white text-decoration-none p-3 rounded hover-bg-secondary" onClick={onClose}>
              <Key size={20} />
              <span>Change Password</span>
            </Link>
            <hr className="border-secondary my-2" />
            <button onClick={() => { handleLogout(); navigate('/login'); }} className="d-flex align-items-center gap-3 text-danger text-decoration-none p-3 rounded hover-bg-secondary w-100 text-start border-0 bg-transparent">
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </>
        ) : (
          <Link to="/login" className="d-flex align-items-center gap-3 text-white text-decoration-none p-3 rounded hover-bg-secondary" onClick={onClose}>
            <LogIn size={20} />
            <span>Login</span>
          </Link>
        )}
      </div>
    </div>
  );
}