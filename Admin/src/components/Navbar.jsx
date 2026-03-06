// src/components/Navbar.jsx
import { useTickets } from '../context/TicketContext';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Sun, Moon, Bell, Maximize, User, LogIn, Key, LogOut, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { darkMode, setDarkMode } = useTickets();
  const { user, isAuthenticated, logout } = useAuth();
  const [showNotif, setShowNotif] = useState(false);
  const [showProfileSidebar, setShowProfileSidebar] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setShowProfileSidebar(false);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => console.log(err));
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <>
      <nav className={`navbar navbar-expand-lg border-bottom shadow-sm px-4 ${darkMode ? 'bg-dark navbar-dark' : 'bg-white navbar-light'}`}>

        <div className="d-flex align-items-center gap-3">

          <div
            className="d-flex align-items-center justify-content-center rounded-circle bg-gradient-primary text-white shadow"
            style={{
              width: '40px',
              height: '40px',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease'
            }}
            title="Flowly"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>

          <h4 className="mb-0 fw-bold fs-4" style={{ letterSpacing: '-0.5px' }}>
            Flowly
          </h4>
        </div>


        <div className="ms-auto d-flex align-items-center gap-3">

          <button
            className="btn btn-link text-reset p-2"
            onClick={() => setDarkMode(!darkMode)}
            title="Toggle dark mode"
          >
            {darkMode ? <Sun size={22} /> : <Moon size={22} />}
          </button>


          <div className="position-relative">
            <button
              className="btn btn-link text-reset p-2 position-relative"
              onClick={() => setShowNotif(!showNotif)}
            >
              <Bell size={22} />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                3
              </span>
            </button>

            {showNotif && (
              <div className="dropdown-menu dropdown-menu-end show shadow" style={{ width: '320px' }}>
                <h6 className="dropdown-header">Notifications</h6>
                <div className="dropdown-item small text-muted">Ticket #1245 resolved</div>
              </div>
            )}
          </div>


          <button className="btn btn-link text-reset p-2" onClick={toggleFullscreen} title="Toggle fullscreen">
            <Maximize size={22} />
          </button>


          <button
            className="btn btn-link p-0"
            onClick={() => setShowProfileSidebar(!showProfileSidebar)}
            aria-label="Open profile menu"
          >
            <img
              src={user ? `https://ui-avatars.com/api/?name=${user.name}&background=random&color=fff` : "https://i.pravatar.cc/32"}
              alt="User avatar"
              className="rounded-circle shadow-sm"
              width="36"
              height="36"
            />
          </button>
        </div>
      </nav>


      {showProfileSidebar && (
        <>

          <div
            className="position-fixed top-0 start-0 w-100 h-100 bg-black bg-opacity-50"
            style={{ zIndex: 1040 }}
            onClick={() => setShowProfileSidebar(false)}
          />


          <div
            className="position-fixed top-0 end-0 h-100 bg-dark text-white shadow-lg d-flex flex-column"
            style={{
              width: '280px',
              zIndex: 1050,
              transition: 'transform 0.3s ease-in-out',
            }}
          >
            <div className="d-flex justify-content-between align-items-center p-3 border-bottom border-secondary">
              <h5 className="mb-0">My Account</h5>
              <button
                className="btn btn-link text-white p-0"
                onClick={() => setShowProfileSidebar(false)}
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* User Info Section */}
            {isAuthenticated && user && (
              <div className="p-4 text-center border-bottom border-secondary" style={{ background: 'linear-gradient(135deg, rgba(102,126,234,0.1) 0%, rgba(118,75,162,0.1) 100%)' }}>
                <img
                  src={`https://ui-avatars.com/api/?name=${user.name}&background=random&color=fff&size=80`}
                  alt="User Cover"
                  className="rounded-circle mb-3 border border-3 border-secondary"
                  style={{ width: '80px', height: '80px' }}
                />
                <h5 className="fw-bold mb-1">{user.name}</h5>
                <p className="text-white-50 small mb-0">{user.email}</p>
                <span className={`badge mt-2 ${user.role === 'admin' ? 'bg-danger' : 'bg-primary'}`}>
                  {user.role}
                </span>
              </div>
            )}

            <div className="flex-grow-1 p-2 overflow-auto">
              {isAuthenticated ? (
                <>
                  <Link to="/profile" onClick={() => setShowProfileSidebar(false)} className="d-flex align-items-center gap-3 text-white text-decoration-none p-3 rounded hover-bg-secondary" style={{ transition: 'background-color 0.2s' }}>
                    <User size={20} className='text-success' />
                    <span>Profile</span>
                  </Link>

                  <Link to="/login" state={{ tab: 'changepw' }} onClick={() => setShowProfileSidebar(false)} className="d-flex align-items-center gap-3 text-white text-decoration-none p-3 rounded hover-bg-secondary" style={{ transition: 'background-color 0.2s' }}>
                    <Key size={20} className='text-warning' />
                    <span>Change Password</span>
                  </Link>

                  <hr className="border-secondary my-2" />

                  <button onClick={handleLogout} className="d-flex align-items-center gap-3 text-danger text-decoration-none p-3 rounded hover-bg-secondary w-100 text-start border-0 bg-transparent" style={{ transition: 'background-color 0.2s' }}>
                    <LogOut size={20} className='text-danger' />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <Link to="/login" onClick={() => setShowProfileSidebar(false)} className="d-flex align-items-center gap-3 text-white text-decoration-none p-3 rounded hover-bg-secondary" style={{ transition: 'background-color 0.2s' }}>
                  <LogIn size={20} className='text-info' />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}