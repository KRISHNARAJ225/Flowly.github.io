import { useState } from 'react';
import { useTickets } from '../context/TicketContext';
import CreateTicketModal from './CreateTicketModal';  
import { PlusCircle } from 'lucide-react';

export default function Tickets() {
  const { tickets } = useTickets();
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0 fw-bold text-info">Tickets</h2>
        
        <button
          className="btn btn-primary d-flex align-items-center gap-2"
          onClick={() => setShowCreateModal(true)}
        >
          <PlusCircle size={18} />
          Create New Ticket
        </button>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body">
          {tickets.length === 0 ? (
            <div className="alert alert-info text-center py-5 mb-0">
              No tickets created yet. Click "Create New Ticket" to get started.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Employee ID</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Designation</th>
                    <th>Zip</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((ticket, index) => (
                    <tr key={ticket.id}>
                      <td>{index + 1}</td>
                      <td>{ticket.employeeId}</td>
                      <td>{ticket.fullName}</td>
                      <td>{ticket.officialEmail}</td>
                      <td>{ticket.department}</td>
                      <td>{ticket.designation}</td>
                      <td>{ticket.zip}</td>
                      <td>
                        <span className={`badge bg-${ticket.status === 'Pending' ? 'warning' : 'success'} text-dark`}>
                          {ticket.status}
                        </span>
                      </td>
                      <td>{ticket.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {showCreateModal && (
        <CreateTicketModal 
          onClose={() => setShowCreateModal(false)} 
        />
      )}
    </div>
  );
}