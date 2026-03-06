
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, TicketCheck, Users, Mail, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { isAdmin } = useAuth();

  useEffect(() => {
    if (collapsed) {
      document.body.classList.add('sidebar-collapsed');
    } else {
      document.body.classList.remove('sidebar-collapsed');
    }

    return () => {
      document.body.classList.remove('sidebar-collapsed');
    };
  }, [collapsed]);

  return (
    <>
      <aside className="sidebar bg-dark text-white">
        <div className="d-flex align-items-center justify-content-between p-3 border-bottom border-secondary">
          <h5 className={`mb-0 fw-bold ${collapsed ? 'd-none' : ''}`}>
            Ticket System
          </h5>
          <button
            className="btn btn-link text-white p-0 fs-4"
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expand menu" : "Collapse menu"}
          >
            {collapsed ? <i className="bi bi-list"></i> : <i className="bi bi-x-lg"></i>}
          </button>
        </div>

        <nav className="nav flex-column p-2">
          <Link
            to="/"
            className={`nav-link d-flex align-items-center gap-3 py-3 px-3 rounded ${location.pathname === '/' || location.pathname === '/dashboard' ? 'active' : ''}`}
          >
            <LayoutDashboard size={20} />
            {!collapsed && <span>Dashboard</span>}
          </Link>

          <Link
            to="/tickets"
            className={`nav-link d-flex align-items-center gap-3 py-3 px-3 rounded ${location.pathname === '/tickets' ? 'active' : ''}`}
          >
            <TicketCheck size={20} />
            {!collapsed && <span>Tickets</span>}
          </Link>

          <Link
            to="/customers"
            className={`nav-link d-flex align-items-center gap-3 py-3 px-3 rounded ${location.pathname === '/customers' ? 'active' : ''}`}
          >
            <Users size={20} />
            {!collapsed && <span>Customers</span>}
          </Link>

          <Link
            to="/mailbox"
            className={`nav-link d-flex align-items-center gap-3 py-3 px-3 rounded ${location.pathname === '/mailbox' ? 'active' : ''}`}
          >
            <Mail size={20} />
            {!collapsed && <span>Mailbox</span>}
          </Link>

          {isAdmin && (
            <Link
              to="/leads"
              className={`nav-link d-flex align-items-center gap-3 py-3 px-3 rounded ${location.pathname === '/leads' ? 'active' : ''}`}
            >
              <UserCheck size={20} />
              {!collapsed && <span>Leads</span>}
            </Link>
          )}
        </nav>
      </aside>

      {!collapsed && window.innerWidth < 992 && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-black bg-opacity-50 d-lg-none"
          onClick={() => setCollapsed(true)}
          style={{ zIndex: 1029 }}
        />
      )}
    </>
  );
}