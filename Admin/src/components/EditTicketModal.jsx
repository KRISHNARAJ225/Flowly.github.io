import { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

export default function EditTicketModal({ ticket, onClose, updateTicket }) {
    const [form, setForm] = useState({
        employeeId: ticket?.employeeId || '',
        fullName: ticket?.fullName || '',
        officialEmail: ticket?.officialEmail || '',
        department: ticket?.department || '',
        designation: ticket?.designation || '',
        zip: ticket?.zip || '',
        status: ticket?.status || 'Pending',
    });

    const [validated, setValidated] = useState(false);
    const modalRef = useRef(null);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!e.currentTarget.checkValidity()) {
            setValidated(true);
            return;
        }

        try {
            await updateTicket(ticket._id, form);
            toast.success('Ticket updated successfully!');
            onClose();
        } catch (error) {
            toast.error('Failed to update ticket');
        }
    };

    return (
        <>
            <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex={-1} ref={modalRef}>
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header bg-light">
                            <h5 className="modal-title text-primary"><i className="bi bi-pencil-square me-2"></i>Edit Ticket</h5>
                            <button type="button" className="btn-close" onClick={onClose} aria-label="Close" />
                        </div>

                        <div className="modal-body">
                            <form className={`row g-3 needs-validation ${validated ? 'was-validated' : ''}`} noValidate onSubmit={handleSubmit}>
                                <div className="col-md-4">
                                    <label htmlFor="employeeId" className="form-label text-info">Employee ID</label>
                                    <input type="number" className="form-control" value={form.employeeId} onChange={(e) => setForm({ ...form, employeeId: e.target.value })} required />
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="fullName" className="form-label text-info">Full Name</label>
                                    <input type="text" className="form-control" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} required />
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="officialEmail" className="form-label text-info">Official Email</label>
                                    <input type="email" className="form-control" value={form.officialEmail} onChange={(e) => setForm({ ...form, officialEmail: e.target.value })} required />
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="department" className="form-label text-info">Department</label>
                                    <input type="text" className="form-control" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} required />
                                </div>

                                <div className="col-md-3">
                                    <label htmlFor="designation" className="form-label text-info">Designation</label>
                                    <select className="form-select" value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} required>
                                        <option value="" disabled>Choose...</option>
                                        <option>Associate</option>
                                        <option>Senior</option>
                                        <option>Lead</option>
                                        <option>Management</option>
                                    </select>
                                </div>

                                <div className="col-md-2">
                                    <label htmlFor="status" className="form-label text-info">Status</label>
                                    <select className="form-select" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} required>
                                        <option value="Pending">Pending</option>
                                        <option value="Resolved">Resolved</option>
                                        <option value="Closed">Closed</option>
                                    </select>
                                </div>

                                <div className="col-md-3">
                                    <label htmlFor="zip" className="form-label text-info">Zip / PIN</label>
                                    <input type="text" className="form-control" value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value })} required pattern="[0-9]{5,6}" />
                                </div>

                                <div className="col-12 text-end mt-4 border-top pt-3">
                                    <button type="button" className="btn btn-secondary me-3" onClick={onClose}>Cancel</button>
                                    <button type="submit" className="btn btn-primary px-4"><i className="bi bi-save me-2"></i>Save Changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show" onClick={onClose} style={{ zIndex: 1040 }} />
        </>
    );
}
