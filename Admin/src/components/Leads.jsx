// src/components/Leads.jsx
import { useState } from 'react';
import { useTickets } from '../context/TicketContext';
import toast from 'react-hot-toast';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

export default function Leads() {
  const { leads, updateLeadStatus } = useTickets();

  const handleStatusChange = (leadId, status) => {
    updateLeadStatus(leadId, status);
    if (status === 'Approved') {
      toast.success('Lead Approved! → Cleared on Dashboard', {
        icon: '✅',
        duration: 4000
      });
    } else if (status === 'Rejected') {
      toast.error('Lead Rejected! → Rejected on Dashboard');
    }
  };

  return (
    <div className="container-fluid py-4">
      <h2 className="mb-4 fw-bold text-primary outline-danger">Today Tickets:</h2>

      <div className="row g-4">
        {leads.length === 0 ? (
          <div className="col-12">
            <div className="alert alert-info text-center py-5">
              No leads yet. New tickets will appear here automatically.
            </div>
          </div>
        ) : (
          leads.map((lead) => (
            <div key={lead.id} className="col-lg-4 col-md-6">
              <div className="card h-100 shadow border-0 hover-lift">
                <div className="card-body">
                  <h5 className="card-title text-truncate">{lead.name}</h5>
                  <p className="card-text text-muted small mb-2">
                    {lead.description || 'No description'}
                  </p>
                  {lead.query && (
                    <p className="card-text small">
                      <strong>Query:</strong> {lead.query}
                    </p>
                  )}
                  <p className="text-muted small mt-3">
                    <strong>Created:</strong> {lead.date}
                  </p>

                 
                  <div className="d-flex gap-2 mt-4">
                    <button
                      onClick={() => handleStatusChange(lead.id, 'Approved')}
                      className={`btn btn-sm flex-grow-1 ${
                        lead.status === 'Approved'
                          ? 'btn-success'
                          : 'btn-outline-success'
                      }`}
                      disabled={lead.status === 'Approved'}
                    >
                      <CheckCircle size={16} className="me-1" />
                      Approve
                    </button>

                    <button
                      onClick={() => handleStatusChange(lead.id, 'Rejected')}
                      className={`btn btn-sm flex-grow-1 ${
                        lead.status === 'Rejected'
                          ? 'btn-danger'
                          : 'btn-outline-danger'
                      }`}
                      disabled={lead.status === 'Rejected'}
                    >
                      <XCircle size={16} className="me-1" />
                      Reject
                    </button>

                    <button
                      onClick={() => handleStatusChange(lead.id, 'Pending')}
                      className={`btn btn-sm flex-grow-1 ${
                        lead.status === 'Pending'
                          ? 'btn-warning'
                          : 'btn-outline-warning'
                      }`}
                      disabled={lead.status === 'Pending'}
                    >
                      <Clock size={16} className="me-1" />
                      Pending
                    </button>
                  </div>
                </div>

              
                <div className="card-footer bg-transparent border-0 text-center">
                  <span
                    className={`badge rounded-pill px-4 py-2 fs-6 ${
                      lead.status === 'Approved'
                        ? 'bg-success'
                        : lead.status === 'Rejected'
                        ? 'bg-danger'
                        : 'bg-warning text-dark'
                    }`}
                  >
                    {lead.status}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}