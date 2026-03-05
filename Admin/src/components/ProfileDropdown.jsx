// src/components/ProfileDropdown.jsx
import { LogOut, Settings, User } from 'lucide-react';

export default function ProfileDropdown() {
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
        <span className="d-none d-md-inline">User</span>
      </button>

      <ul className="dropdown-menu dropdown-menu-end">
        <li>
          <a className="dropdown-item" href="#">
            <User size={16} className="me-2" /> Profile
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            <Settings size={16} className="me-2" /> Settings
          </a>
        </li>
        <li><hr className="dropdown-divider" /></li>
        <li>
          <a className="dropdown-item text-danger" href="#">
            <LogOut size={16} className="me-2" /> Logout
          </a>
        </li>
      </ul>
    </div>
  );
}