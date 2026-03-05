// src/components/ProfileSidebar.jsx
import { useState, useEffect, useRef } from 'react';
import { User, LogIn, Key, LogOut, X } from 'lucide-react';

export default function ProfileSidebar({ isOpen, onClose }) {
  const sidebarRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="position-fixed top-0 end-0 h-100 bg-dark text-white shadow-lg"
      style={{
        width: '280px',
        zIndex: 1050,
        transform: 'translateX(0)',
        transition: 'transform 0.3s ease-in-out',
      }}
      ref={sidebarRef}
    >
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center p-3 border-bottom border-secondary">
        <h5 className="mb-0">My Account</h5>
        <button 
          className="btn btn-link text-white p-0"
          onClick={onClose}
          aria-label="Close profile menu"
        >
          <X size={24} />
        </button>
      </div>

      {/* Menu Items */}
      <div className="p-2">
        <a 
          href="#" 
          className="d-flex align-items-center gap-3 text-white text-decoration-none p-3 rounded hover-bg-secondary"
        >
          <User size={20} />
          <span>Profile</span>
        </a>

        <a 
          href="#" 
          className="d-flex align-items-center gap-3 text-white text-decoration-none p-3 rounded hover-bg-secondary"
        >
          <LogIn size={20} />
          <span>Login</span>
        </a>

        <a 
          href="#" 
          className="d-flex align-items-center gap-3 text-white text-decoration-none p-3 rounded hover-bg-secondary"
        >
          <Key size={20} />
          <span>Change Password</span>
        </a>

        <hr className="border-secondary my-2" />

        <a 
          href="#" 
          className="d-flex align-items-center gap-3 text-danger text-decoration-none p-3 rounded hover-bg-secondary"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </a>
      </div>
    </div>
  );
}