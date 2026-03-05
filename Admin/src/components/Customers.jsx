
import { useTickets } from '../context/TicketContext';
import jsPDF from 'jspdf';
import { Eye } from 'lucide-react';
import { useEffect, useRef } from 'react';
import $ from 'jquery';
import 'datatables.net-bs5';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';

export default function Customers() {
  const { tickets } = useTickets();
  const tableRef = useRef(null);

  useEffect(() => {
    if (!tableRef.current) return;

    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().destroy();
    }

    $(tableRef.current).DataTable({
      responsive: true,
      paging: true,
      pageLength: 10,
      lengthMenu: [5, 10, 25, 50],
      searching: true,
      ordering: true,
      info: true,
      autoWidth: false,
      language: {
        search: "Search customers:",
        lengthMenu: "Show _MENU_ entries",
        info: "Showing _START_ to _END_ of _TOTAL_ tickets",
      },
      dom: "<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>>" +
           "<'row'<'col-sm-12'tr>>" +
           "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
    });

    return () => {
      if ($.fn.DataTable.isDataTable(tableRef.current)) {
        $(tableRef.current).DataTable().destroy();
      }
    };
  }, [tickets]);

  const viewPDF = (ticket) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`Ticket #${ticket.id}`, 20, 20);
    doc.setFontSize(12);
    doc.text(`Employee ID: ${ticket.employeeId || 'N/A'}`, 20, 35);
    doc.text(`Full Name: ${ticket.fullName || 'N/A'}`, 20, 45);
    doc.text(`Official Email: ${ticket.officialEmail || 'N/A'}`, 20, 55);
    doc.text(`Department: ${ticket.department || 'N/A'}`, 20, 65);
    doc.text(`Designation: ${ticket.designation || 'N/A'}`, 20, 75);
    doc.text(`Zip: ${ticket.zip || 'N/A'}`, 20, 85);
    doc.text(`Status: ${ticket.status || 'Pending'}`, 20, 95);
    doc.text(`Created: ${ticket.date || 'N/A'}`, 20, 105);
    doc.save(`ticket-${ticket.id}.pdf`);
  };

  return (
    <div className="container-fluid py-4">
      <h2 className="mb-4">Customers & Tickets</h2>

      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table
              ref={tableRef}
              className="table table-hover table-bordered align-middle"
              style={{ width: '100%' }}
            >
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Employee ID</th>
                  <th>Full Name</th>
                  <th>Official Email</th>
                  <th>Department</th>
                  <th>Designation</th>
                  <th>Zip</th>
                  <th>Status</th>
                  <th>Date & Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket, index) => (
                  <tr key={ticket.id}>
                    <td>{index + 1}</td>
                    <td>{ticket.employeeId || '-'}</td>
                    <td>{ticket.fullName || '-'}</td>
                    <td>{ticket.officialEmail || '-'}</td>
                    <td>{ticket.department || '-'}</td>
                    <td>{ticket.designation || '-'}</td>
                    <td>{ticket.zip || '-'}</td>
                    <td>
                      <span className={`badge rounded-pill bg-${ticket.status === 'Cleared' ? 'success' : 'warning'}`}>
                        {ticket.status || 'Pending'}
                      </span>
                    </td>
                    <td>{ticket.date || '-'}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1"
                        onClick={() => viewPDF(ticket)}
                      >
                        <Eye size={16} /> View PDF
                      </button>
                    </td>
                  </tr>
                ))}
                {tickets.length === 0 && (
                  <tr>
                    <td colSpan={10} className="text-center py-4 text-muted">
                      No customers/tickets yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}