import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center text-center overflow-hidden position-relative" style={{
            background: 'linear-gradient(135deg, #1a1f36 0%, #0d1117 100%)',
        }}>
            {/* Background Animated Elements */}
            <div className="position-absolute w-100 h-100 overflow-hidden" style={{ zIndex: 0 }}>
                <div className="position-absolute bg-primary rounded-circle opacity-25" style={{ width: '300px', height: '300px', top: '10%', left: '20%', filter: 'blur(80px)', animation: 'float 6s ease-in-out infinite' }}></div>
                <div className="position-absolute bg-info rounded-circle opacity-25" style={{ width: '250px', height: '250px', bottom: '20%', right: '15%', filter: 'blur(60px)', animation: 'float 8s ease-in-out infinite reverse' }}></div>
            </div>

            <style>{`
        @keyframes float {
          0% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
          100% { transform: translateY(0px) scale(1); }
        }
        @keyframes glitch {
          0% { transform: translate(0) }
          20% { transform: translate(-2px, 2px) }
          40% { transform: translate(-2px, -2px) }
          60% { transform: translate(2px, 2px) }
          80% { transform: translate(2px, -2px) }
          100% { transform: translate(0) }
        }
        .glitch-text {
          animation: glitch 3s infinite;
          position: relative;
        }
        .btn-home {
          transition: all 0.3s ease;
          background: linear-gradient(45deg, #667eea, #764ba2);
          border: none;
        }
        .btn-home:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
        }
      `}</style>

            <div className="position-relative" style={{ zIndex: 1, maxWidth: '600px', padding: '2rem' }}>
                <h1 className="display-1 fw-bold text-white glitch-text mb-0" style={{ fontSize: '8rem', textShadow: '0 0 20px rgba(255,255,255,0.2)' }}>404</h1>
                <h2 className="text-info fw-semibold mb-4 display-6">Page Not Found</h2>

                <div className="glass-card p-4 rounded-4 mb-5 border border-secondary shadow-lg" style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)' }}>
                    <p className="text-white-50 fs-5 mb-0">
                        Oops! It seems you've wandered into an unknown territory. The page you are looking for doesn't exist or has been moved.
                    </p>
                </div>

                <button
                    onClick={() => navigate('/login')}
                    className="btn btn-primary btn-lg rounded-pill px-5 py-3 fw-bold d-inline-flex align-items-center gap-2 btn-home"
                >
                    <Home size={24} />
                    Go Home
                </button>
            </div>
        </div>
    );
}
