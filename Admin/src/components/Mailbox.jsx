
import { useState } from 'react';
import { useTickets } from '../context/TicketContext';
import toast from 'react-hot-toast';
import { Upload, Send, File } from 'lucide-react';

export default function Mailbox() {
  const { uploads, setUploads } = useTickets();
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setUploads(prev => [...prev, {
        name: selected.name,
        size: (selected.size / 1024).toFixed(1) + ' KB',
        type: selected.type
      }]);
      toast.success("File attached");
    }
  };

  const sendMail = () => {
    if (!file) return toast.error("Please attach a file first");
    toast.success("Email sent (demo)");

  };

  return (
    <div className="container-fluid py-4">
      <h2 className="mb-4">Mailbox</h2>

      <div className="card">
        <div className="card-body">
          <div className="mb-4">
            <label className="form-label fw-bold">Compose Message</label>
            <div 
              className="border border-dashed rounded p-5 text-center"
              style={{ cursor: 'pointer', minHeight: '180px' }}
              onClick={() => document.getElementById('fileInput').click()}
            >
              <Upload size={40} className="text-muted mx-auto mb-3" />
              <p className="mb-1">Click or drag file here</p>
              <small className="text-muted">PDF, Excel, JPG supported</small>
              <input 
                type="file" 
                id="fileInput" 
                className="d-none" 
                accept=".pdf,.xlsx,.xls,.jpg,.jpeg,.png"
                onChange={handleFileChange}
              />
            </div>
          </div>

          {uploads.length > 0 && (
            <div className="mb-4">
              <h6>Attached Files</h6>
              <ul className="list-group">
                {uploads.map((f, i) => (
                  <li key={i} className="list-group-item d-flex align-items-center gap-3">
                    <File size={20} />
                    <div className="flex-grow-1">
                      <div>{f.name}</div>
                      <small className="text-muted">{f.size}</small>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button 
            className="btn btn-primary d-flex align-items-center gap-2"
            onClick={sendMail}
          >
            <Send size={18} /> Send Email
          </button>
        </div>
      </div>
    </div>
  );
}