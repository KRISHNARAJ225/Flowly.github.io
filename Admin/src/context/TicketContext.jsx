
import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const TicketContext = createContext();

export function TicketProvider({ children }) {

  const { token, user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [uploads, setUploads] = useState([]);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const fetchTickets = async () => {
    if (!token) return;
    try {
      const res = await fetch('http://localhost:5000/api/tickets', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) setTickets(data);
    } catch (error) {
      console.error('Failed to fetch tickets:', error);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [token]);

  const addTicket = async (newTicket) => {
    if (!token) return;
    try {
      const res = await fetch('http://localhost:5000/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newTicket)
      });
      const data = await res.json();

      if (res.ok) {
        setTickets(prev => [data, ...prev]);
      } else {
        throw new Error(data.message || 'Failed to create ticket');
      }
    } catch (error) {
      console.error('Failed to add ticket:', error);
      throw error;
    }
  };

  const updateTicket = async (id, updatedData) => {
    if (!token) return;
    try {
      const res = await fetch(`http://localhost:5000/api/tickets/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updatedData)
      });
      const data = await res.json();

      if (res.ok) {
        setTickets(prev => prev.map(t => t._id === id ? data : t));
        return { success: true, ticket: data };
      } else {
        throw new Error(data.message || 'Failed to update ticket');
      }
    } catch (error) {
      console.error('Failed to update ticket:', error);
      throw error;
    }
  };

  const deleteTicket = async (id) => {
    if (!token) return;
    try {
      const res = await fetch(`http://localhost:5000/api/tickets/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();

      if (res.ok) {
        setTickets(prev => prev.filter(t => t._id !== id));
        return { success: true };
      } else {
        throw new Error(data.message || 'Failed to delete ticket');
      }
    } catch (error) {
      console.error('Failed to delete ticket:', error);
      throw error;
    }
  };


  // Leads are now synonymous with tickets
  const leads = tickets.map(t => ({
    id: t._id,
    name: t.fullName,
    description: t.department,
    query: t.designation,
    status: t.status,
    date: t.date
  }));

  const addLead = (newLead) => {
    // Add logic here if custom leads outside of tickets are needed again. 
    // Currently, leads are automatically derived from tickets.
  };

  const updateLeadStatus = async (leadId, newStatus) => {
    try {
      await updateTicket(leadId, { status: newStatus });
    } catch (err) {
      console.error('Failed to update lead status:', err);
    }
  };

  const value = {
    tickets,
    addTicket,
    updateTicket,
    deleteTicket,
    uploads,
    setUploads,
    darkMode,
    setDarkMode,
    leads,
    addLead,
    updateLeadStatus
  };

  return (
    <TicketContext.Provider value={value}>
      {children}
    </TicketContext.Provider>
  );
}

export function useTickets() {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error('useTickets must be used within TicketProvider');
  }
  return context;
}