
import { useState, useEffect, useRef } from 'react';
import { useTickets } from '../context/TicketContext';
import toast from 'react-hot-toast';

export default function CreateTicketModal({ onClose }) {
  const { addTicket } = useTickets();

  const [form, setForm] = useState({
    employeeId: '',
    fullName: '',
    officialEmail: '',
    department: '',
    designation: '',
    zip: '',
    agree: false,
  });

  const [validated, setValidated] = useState(false);
  const modalRef = useRef(null);

  
  useEffect(() => {
    const firstInput = modalRef.current?.querySelector('input');
    if (firstInput) firstInput.focus();

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!e.currentTarget.checkValidity()) {
      setValidated(true);
      return;
    }

    addTicket({
      employeeId: form.employeeId,
      fullName: form.fullName,
      officialEmail: form.officialEmail,
      department: form.department,
      designation: form.designation,
      zip: form.zip,
    });

    toast.success('Ticket created successfully!');
    onClose();   
  };

  return (
    <>
      <div
        className="modal fade show"
        style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
        tabIndex={-1}
        ref={modalRef}
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Create New Ticket</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Close"
              />
            </div>

            <div className="modal-body">
              <form
                className={`row g-3 needs-validation ${validated ? 'was-validated' : ''}`}
                noValidate
                onSubmit={handleSubmit}
              >
                <div className="col-md-4">
                  <label htmlFor="employeeId" className="form-label text-info">Employee ID</label>
                  <input
                    type="number"
                    className="form-control"
                    id="employeeId"
                    value={form.employeeId}
                    onChange={(e) => setForm({ ...form, employeeId: e.target.value })}
                    required
                  />
                  <div className="invalid-feedback ">Please enter Employee ID</div>
                </div>

                <div className="col-md-4">
                  <label htmlFor="fullName" className="form-label text-info">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    required
                  />
                  <div className="invalid-feedback">Please enter Full Name</div>
                </div>

                <div className="col-md-4">
                  <label htmlFor="officialEmail" className="form-label text-info">Official Email</label>
                  <div className="input-group has-validation">
                    <span className="input-group-text">@</span>
                    <input
                      type="email"
                      className="form-control"
                      id="officialEmail"
                      value={form.officialEmail}
                      onChange={(e) => setForm({ ...form, officialEmail: e.target.value })}
                      required
                    />
                    <div className="invalid-feedback text-info">Please enter a valid email</div>
                  </div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="department" className="form-label text-info">Department</label>
                  <input
                    type="text"
                    className="form-control"
                    id="department"
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                    required
                  />
                  <div className="invalid-feedback text-info">Please provide Department</div>
                </div>

                <div className="col-md-3">
                  <label htmlFor="designation" className="form-label text-info">Designation</label>
                  <select
                    className="form-select"
                    id="designation"
                    value={form.designation}
                    onChange={(e) => setForm({ ...form, designation: e.target.value })}
                    required
                  >
                    <option value="" disabled>Choose...</option>
                    <option>Associate</option>
                    <option>Senior</option>
                    <option>Lead</option>
                    <option>Management</option>
                  </select>
                  <div className="invalid-feedback text-info">Please select Designation</div>
                </div>

                <div className="col-md-3">
                  <label htmlFor="zip" className="form-label text-info">Zip / PIN</label>
                  <input
                    type="text"
                    className="form-control"
                    id="zip"
                    value={form.zip}
                    onChange={(e) => setForm({ ...form, zip: e.target.value })}
                    required
                    pattern="[0-9]{5,6}"
                  />
                  <div className="invalid-feedback text-info">Please provide valid Zip/PIN (5-6 digits)</div>
                </div>

                <div className="col-12">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="agreeCheck"
                      checked={form.agree}
                      onChange={(e) => setForm({ ...form, agree: e.target.checked })}
                      required
                    />
                    <label className="form-check-label text-danger" htmlFor="agreeCheck">
                      Agree to terms and conditions
                    </label>
                    <div className="invalid-feedback">You must agree before submitting.</div>
                  </div>
                </div>

                <div className="col-12 text-end mt-4">
                  <button
                    type="button"
                    className="btn btn-secondary me-3"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary px-5">
                    Create Ticket
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div 
        className="modal-backdrop fade show" 
        onClick={onClose} 
        style={{ zIndex: 1040 }} 
      />
    </>
  );
}