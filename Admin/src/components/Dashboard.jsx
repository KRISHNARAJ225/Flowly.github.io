// src/components/Dashboard.jsx
import { useTickets } from '../context/TicketContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

const COLORS = ['#198754', '#ffc107', '#dc3545']; 

export default function Dashboard() {
  const { tickets, leads } = useTickets();

 
  const stats = {
    total: tickets.length,
    cleared: tickets.filter(t => t.status === 'Cleared' || t.status === 'Approved').length,
    pending: tickets.filter(t => t.status === 'Pending').length +
             leads.filter(l => l.status === 'Pending').length,
    rejected: tickets.filter(t => t.status === 'Rejected').length +
              leads.filter(l => l.status === 'Rejected').length,
  };

  const pieData = [
    { name: 'Cleared / Approved', value: stats.cleared },
    { name: 'Pending', value: stats.pending },
    { name: 'Rejected', value: stats.rejected },
  ];

  const lineData = [
    { month: 'Jan', cleared: 5, pending: 12, rejected: 3 },
    { month: 'Feb', cleared: 12, pending: 8, rejected: 5 },
    { month: 'Mar', cleared: 18, pending: 15, rejected: 7 },
    { month: 'Apr', cleared: stats.cleared, pending: stats.pending, rejected: stats.rejected },
  ];

  useEffect(() => {
    if (stats.cleared > 0) {
      toast.success(`Approval Success! ${stats.cleared} cleared leads`, {
        id: 'approval-toast',
        duration: 5000
      });
    }
  }, [stats.cleared]);

  return (
    <div className="container-fluid py-4">
      <h2 className="mb-4 fw-bold">Dashboard</h2>

      
      <div className="row g-4 mb-5">
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card bg-primary text-white shadow-sm border-0 h-100">
            <div className="card-body text-center">
              <h5 className="mb-2">Total Tickets</h5>
              <h2 className="fw-bold">{stats.total}</h2>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card bg-success text-white shadow-sm border-0 h-100">
            <div className="card-body text-center">
              <h5 className="mb-2">Cleared / Approved</h5>
              <h2 className="fw-bold">{stats.cleared}</h2>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card bg-warning text-dark shadow-sm border-0 h-100">
            <div className="card-body text-center">
              <h5 className="mb-2">Pending</h5>
              <h2 className="fw-bold">{stats.pending}</h2>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card bg-danger text-white shadow-sm border-0 h-100">
            <div className="card-body text-center">
              <h5 className="mb-2">Rejected</h5>
              <h2 className="fw-bold">{stats.rejected}</h2>
            </div>
          </div>
        </div>
      </div>

    
      <div className="row g-4">
       
        <div className="col-lg-6">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-header bg-danger fw-semibold ">
              Status Trend Over Time
            </div>
            <div className="card-body" style={{ height: '350px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="cleared" stroke="#198754" strokeWidth={2} name="Cleared" dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="pending" stroke="#ffc107" strokeWidth={2} name="Pending" dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="rejected" stroke="#dc3545" strokeWidth={2} name="Rejected" dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-header bg-danger fw-semibold">
              Status Distribution
            </div>
            <div className="card-body d-flex align-items-center justify-content-center" style={{ height: '350px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={true}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value} tickets`} />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}