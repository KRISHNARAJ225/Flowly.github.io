// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TicketProvider, useTickets } from './context/TicketContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Tickets from './components/Tickets';
import Customers from './components/Customers';
import Mailbox from './components/Mailbox';
import Leads from './components/Leads';
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from './components/ErrorBoundary';

function AppContent() {
  const { darkMode } = useTickets();

  return (
    <div 
      data-bs-theme={darkMode ? "dark" : "light"}
      className="d-flex flex-nowrap vh-100 overflow-hidden"
    >
      <Sidebar />

      <div className="d-flex flex-column flex-grow-1 overflow-hidden">
        <Navbar />
        
        <main
          className="flex-grow-1 overflow-auto bg-body-tertiary"
          style={{
            padding: '1.5rem 1.75rem',
            marginLeft: 'var(--sidebar-width)',
            transition: 'margin-left 0.3s ease'
          }}
        >
          <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/tickets" element={<Tickets />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/mailbox" element={<Mailbox />} />
                <Route path="/leads" element={<Leads />} />
              </Routes>
            </ErrorBoundary>
          </div>
        </main>
      </div>

      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        }}
      />
    </div>
  );
}

function App() {
  return (
    <TicketProvider>
      <Router>
        <AppContent />
      </Router>
    </TicketProvider>
  );
}

export default App;