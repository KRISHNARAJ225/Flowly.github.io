// src/components/ProfileDropdown.jsx
import { LogOut, Key, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProfileDropdown() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dropdown">
      <button
        className="btn btn-link text-reset p-0 d-flex align-items-center gap-2"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <img
          src="https://i.pravatar.cc/32"
          alt="User avatar"
          className="rounded-circle"
          width="32"
          height="32"
        />
        <span className="d-none d-md-inline">{user?.name || 'User'}</span>
      </button>

      <ul className="dropdown-menu dropdown-menu-end">
        <li>
          <Link className="dropdown-item" to="/profile">
            <User size={16} className="me-2" /> Profile
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" to="/login" state={{ tab: 'changepw' }}>
            <Key size={16} className="me-2" /> Change Password
          </Link>
        </li>
        <li><hr className="dropdown-divider" /></li>
        <li>
          <button className="dropdown-item text-danger border-0 bg-transparent w-100 text-start" onClick={handleLogout}>
            <LogOut size={16} className="me-2" /> Logout
          </button>
        </li>
      </ul>
    </div>
  );
}