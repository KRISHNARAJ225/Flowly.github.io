
import { createContext, useContext, useState, useEffect } from 'react';

const TicketContext = createContext();

export function TicketProvider({ children }) {

  const [tickets, setTickets] = useState(() => {
    const saved = localStorage.getItem('tickets');
    return saved ? JSON.parse(saved) : [];
  });

  const addTicket = (newTicket) => {
    const ticketWithId = {
      ...newTicket,
      id: Date.now(),
      date: new Date().toLocaleString(),
      status: 'Pending' 
    };
    const updatedTickets = [...tickets, ticketWithId];
    setTickets(updatedTickets);
    localStorage.setItem('tickets', JSON.stringify(updatedTickets));


    const leadFromTicket = {
      id: ticketWithId.id,
      name: ticketWithId.name,
      description: ticketWithId.description || '',
      query: '',
      status: 'Pending',
      date: ticketWithId.date
    };
    addLead(leadFromTicket); 
  };

 
  const [uploads, setUploads] = useState([]);

 
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);


  const [leads, setLeads] = useState(() => {
    const saved = localStorage.getItem('leads');
    return saved ? JSON.parse(saved) : [];
  });

  const addLead = (newLead) => {
    const leadWithId = {
      ...newLead,
      id: newLead.id || Date.now(),
      date: newLead.date || new Date().toLocaleString()
    };
    const updated = [...leads, leadWithId];
    setLeads(updated);
    localStorage.setItem('leads', JSON.stringify(updated));
  };

  const updateLeadStatus = (leadId, newStatus) => {
    const updated = leads.map(lead =>
      lead.id === leadId ? { ...lead, status: newStatus } : lead
    );
    setLeads(updated);
    localStorage.setItem('leads', JSON.stringify(updated));

    
    setTickets(prevTickets =>
      prevTickets.map(t =>
        t.id === leadId ? { ...t, status: newStatus } : t
      )
    );
  };

  const value = {
    tickets,
    addTicket,
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