// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { TicketProvider, useTickets } from './context/TicketContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Tickets from './components/Tickets';
import Customers from './components/Customers';
import Mailbox from './components/Mailbox';
import Leads from './components/Leads';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';
import NotFound from './pages/NotFound';
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from './components/ErrorBoundary';


function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function AppContent() {
  const { darkMode } = useTickets();
  const { isAuthenticated, loading, isAdmin } = useAuth();


  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {isAuthenticated ? (
        <div
          data-bs-theme={darkMode ? "dark" : "light"}
          className="d-flex flex-nowrap vh-100 overflow-hidden"
        >
          <Sidebar />

          <div className="d-flex flex-column flex-grow-1 overflow-hidden">
            <Navbar />

            <main
              className="main-content flex-grow-1 overflow-auto bg-body-tertiary"
              style={{
                padding: '1.5rem 1.75rem',
              }}
            >
              <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
                <ErrorBoundary>
                  <Routes>
                    <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="/tickets" element={<ProtectedRoute><Tickets /></ProtectedRoute>} />
                    <Route path="/customers" element={<ProtectedRoute><Customers /></ProtectedRoute>} />
                    <Route path="/mailbox" element={<ProtectedRoute><Mailbox /></ProtectedRoute>} />
                    <Route path="/leads" element={<ProtectedRoute>{isAuthenticated && !isAdmin ? <Navigate to="/dashboard" replace /> : <Leads />}</ProtectedRoute>} />
                    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                    <Route path="/change-password" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </ErrorBoundary>
              </div>
            </main>
          </div>

          <Toaster position="top-right" />
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <TicketProvider>
          <AppContent />
        </TicketProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;