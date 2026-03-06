import { useState, useMemo } from 'react';
import { useTickets } from '../context/TicketContext';
import CreateTicketModal from './CreateTicketModal';
import EditTicketModal from './EditTicketModal';
import { PlusCircle, Search, Filter, Trash2, Edit, AlertCircle } from 'lucide-react';

export default function Tickets() {
  const { tickets, deleteTicket } = useTickets();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);

  // Filter & Pagination States
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Adjust pagination size here

  // Derived state: Filtered & Pagination
  const filteredTickets = useMemo(() => {
    return tickets.filter(t => {
      const matchesSearch =
        t.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.officialEmail.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'All' || t.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [tickets, searchTerm, filterStatus]);

  const paginatedTickets = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredTickets.slice(start, start + itemsPerPage);
  }, [filteredTickets, currentPage]);

  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);

  // Handlers
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      await deleteTicket(id);

      // Prevent pagination from getting stuck on an empty page after deletion
      if (paginatedTickets.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  return (
    <div className="container-fluid py-4 animate__animated animate__fadeIn">
      {/* Header & Controls */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 gap-3">
        <h2 className="mb-0 fw-bold text-info" style={{ letterSpacing: '0.5px' }}>Ticket Management</h2>

        <div className="d-flex gap-3 w-100 w-md-auto align-items-center">
          <div className="input-group flex-nowrap" style={{ maxWidth: '300px' }}>
            <span className="input-group-text bg-white border-end-0"><Search size={18} className="text-muted" /></span>
            <input
              type="text"
              className="form-control border-start-0 ps-0 text-white bg-dark border-secondary"
              placeholder="Search by Name/Email..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            />
          </div>

          <div className="input-group flex-nowrap" style={{ maxWidth: '200px' }}>
            <span className="input-group-text bg-white border-end-0"><Filter size={18} className="text-muted" /></span>
            <select
              className="form-select border-start-0 ps-0 text-white bg-dark border-secondary"
              value={filterStatus}
              onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <button
            className="btn btn-primary d-flex align-items-center gap-2 shadow-sm rounded-pill px-4 ms-auto"
            onClick={() => setShowCreateModal(true)}
            style={{ transition: 'all 0.3s ease' }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <PlusCircle size={18} />
            <span className="d-none d-sm-inline">New Ticket</span>
          </button>
        </div>
      </div>

      {/* Ticket Table Card */}
      <div className="card shadow-lg border-0 bg-dark text-white" style={{ borderRadius: '15px', overflow: 'hidden' }}>
        <div className="card-body p-0">
          {filteredTickets.length === 0 ? (
            <div className="alert alert-dark text-center py-5 mb-0 border-0 rounded-0">
              <AlertCircle size={48} className="text-muted mb-3 d-block mx-auto" />
              <h5 className="text-muted">No tickets found matching your criteria.</h5>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-dark table-hover align-middle mb-0" style={{ borderCollapse: 'separate', borderSpacing: '0 8px' }}>
                <thead className="table-dark sticky-top">
                  <tr>
                    <th className="ps-4">Employee ID</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Designation</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th className="text-center pe-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="border-top-0">
                  {paginatedTickets.map((ticket) => (
                    <tr key={ticket._id} style={{ transition: 'all 0.2s', cursor: 'default' }}>
                      <td className="ps-4 fw-medium text-white-50">{ticket.employeeId}</td>
                      <td className="fw-bold">{ticket.fullName}</td>
                      <td><a href={`mailto:${ticket.officialEmail}`} className="text-decoration-none">{ticket.officialEmail}</a></td>
                      <td>{ticket.department}</td>
                      <td><span className="badge bg-secondary rounded-pill">{ticket.designation}</span></td>
                      <td>
                        <span className={`badge rounded-pill px-3 py-2 bg-${ticket.status === 'Pending' ? 'warning text-dark' :
                            ticket.status === 'Resolved' ? 'success' : 'secondary'
                          } shadow-sm`}
                        >
                          {ticket.status}
                        </span>
                      </td>
                      <td className="text-white-50 small">{ticket.date.split(',')[0]}</td>
                      <td className="text-center pe-4">
                        <div className="d-flex justify-content-center gap-2">
                          <button
                            className="btn btn-sm btn-outline-info rounded-circle p-2 d-flex align-items-center justify-content-center"
                            onClick={() => setEditingTicket(ticket)}
                            title="Edit Ticket"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger rounded-circle p-2 d-flex align-items-center justify-content-center"
                            onClick={() => handleDelete(ticket._id)}
                            title="Delete Ticket"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className="card-footer bg-dark border-top border-secondary py-3 d-flex justify-content-between align-items-center">
            <span className="text-muted small ps-2">Showing {paginatedTickets.length} of {filteredTickets.length} tickets</span>
            <nav aria-label="Ticket pagination">
              <ul className="pagination pagination-sm mb-0">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button className="page-link bg-dark text-white border-secondary" onClick={() => setCurrentPage(p => p - 1)}>Previous</button>
                </li>
                {[...Array(totalPages)].map((_, i) => (
                  <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                    <button className="page-link bg-dark text-white border-secondary" onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button className="page-link bg-dark text-white border-secondary" onClick={() => setCurrentPage(p => p + 1)}>Next</button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>

      {showCreateModal && <CreateTicketModal onClose={() => setShowCreateModal(false)} />}

      {editingTicket && (
        <EditTicketModal
          ticket={editingTicket}
          onClose={() => setEditingTicket(null)}
          updateTicket={useTickets().updateTicket}
        />
      )}
    </div>
  );
}