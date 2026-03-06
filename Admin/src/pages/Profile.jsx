import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Mail, Shield, Key, List, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  // Trigger entrance animation
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="container-fluid py-5 p-md-5">

      {/* Internal Styles for Animations & Glassmorphism */}
      <style>{`
        .profile-entrance {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        .profile-entrance.mounted {
          opacity: 1;
          transform: translateY(0);
        }
        .banner-bg {
          background-image: url('https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2000&auto=format&fit=crop');
          background-size: cover;
          background-position: center;
          position: relative;
          min-height: 220px;
        }
        .banner-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 0%, rgba(33, 37, 41, 0.9) 100%);
        }
        .glass-btn {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          transition: all 0.3s ease;
        }
        .glass-btn:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        }
        .avatar-container {
          position: relative;
          z-index: 10;
          margin-top: -60px;
          margin-bottom: 20px;
        }
        .avatar-img {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          border: 4px solid #fff;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          background-color: #212529;
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .avatar-img:hover {
          transform: scale(1.05);
        }
      `}</style>

      {/* Page Header */}
      <div className={`mb-5 text-center profile-entrance ${mounted ? 'mounted' : ''}`} style={{ transitionDelay: '0.1s' }}>
        <h2 className="fw-bold display-5 mb-2 bg-gradient text-info" style={{ letterSpacing: '1px' }}>My Account</h2>
        <p className="text-secondary fs-5">Manage your Flowly profile and preferences.</p>
      </div>

      <div className="row justify-content-center px-3">
        <div className="col-12 col-lg-8 col-xl-7">

          {/* Main Animated Profile Card */}
          <div className={`card border-0 bg-dark text-white rounded-4 overflow-hidden shadow-lg profile-entrance ${mounted ? 'mounted' : ''}`} style={{ transitionDelay: '0.2s', border: '1px solid rgba(255,255,255,0.05)' }}>

            {/* Dynamic Nature Banner */}
            <div className="banner-bg">
              <div className="banner-overlay"></div>
            </div>

            <div className="card-body px-4 pb-5 pt-0 text-center">

              {/* Overlapping Avatar */}
              <div className="avatar-container d-inline-block">
                <img
                  src={user ? `https://ui-avatars.com/api/?name=${user.name}&background=random&color=fff&size=150` : "https://i.pravatar.cc/150"}
                  alt="User Cover"
                  className="avatar-img"
                />
              </div>

              {/* User Identity String */}
              <h3 className="mb-2 fw-bold display-6">{user?.name || 'Loading'}</h3>
              <div className="d-flex justify-content-center align-items-center gap-2 mb-4">
                <Mail size={16} className="text-white-50" />
                <span className="text-white-50">{user?.email || 'Loading'}</span>
                <span className="mx-2 text-white-50">•</span>
                <span className={`badge ${user?.role === 'admin' ? 'bg-danger' : 'bg-primary'} px-3 py-2 rounded-pill shadow-sm`}>
                  <Shield size={14} className="me-1 mb-1" /> {user?.role.toUpperCase() || 'USER'}
                </span>
              </div>

              {/* Actions Wrapper - Glassmorphic */}
              <div className="mt-5 d-flex flex-column gap-3 text-start">

                <button
                  className="w-100 btn text-white text-start p-4 d-flex justify-content-between align-items-center glass-btn"
                  onClick={() => navigate('/tickets')}
                >
                  <div className="d-flex align-items-center gap-4">
                    <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center shadow" style={{ width: '48px', height: '48px' }}>
                      <List size={22} className="text-white" />
                    </div>
                    <div>
                      <h5 className="mb-1 fw-bold text-white">View Tickets</h5>
                      <p className="text-white-50 small mb-0">Manage tickets and view your history</p>
                    </div>
                  </div>
                  <ChevronRight size={24} className="text-white-50" />
                </button>

                <button
                  className="w-100 btn text-white text-start p-4 d-flex justify-content-between align-items-center glass-btn"
                  onClick={() => navigate('/login', { state: { tab: 'changepw' } })}
                >
                  <div className="d-flex align-items-center gap-4">
                    <div className="bg-warning rounded-circle d-flex align-items-center justify-content-center shadow" style={{ width: '48px', height: '48px' }}>
                      <Key size={22} className="text-dark" />
                    </div>
                    <div>
                      <h5 className="mb-1 fw-bold text-white">Security Settings</h5>
                      <p className="text-white-50 small mb-0">Update password and secure your account</p>
                    </div>
                  </div>
                  <ChevronRight size={24} className="text-white-50" />
                </button>

              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}