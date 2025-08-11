import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SalesRepDashboard() {
  const navigate = useNavigate();
  const [reps, setReps] = useState([]);
  const [search, setSearch] = useState('');
  const [editIdx, setEditIdx] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('salesReps') || '[]');
    setReps(stored);
  }, []);

  const handleBack = () => {
    navigate('/admin-dashboard');
  };

  const handleRegister = () => {
    navigate('/sales-rep-register');
  };

  const handleEdit = (idx) => {
    setEditIdx(idx);
    setEditForm({ ...reps[idx] });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSave = (idx) => {
    const updatedReps = reps.map((rep, i) => (i === idx ? { ...editForm } : rep));
    setReps(updatedReps);
    localStorage.setItem('salesReps', JSON.stringify(updatedReps));
    setEditIdx(null);
  };

  const handleEditCancel = () => {
    setEditIdx(null);
  };

  const handleDelete = (idx) => {
    if (window.confirm('Are you sure you want to delete this sales rep?')) {
      const updated = reps.filter((_, i) => i !== idx);
      setReps(updated);
      localStorage.setItem('salesReps', JSON.stringify(updated));
    }
  };

  // Filter reps by search
  const filteredReps = reps.filter(rep => {
    const q = search.toLowerCase();
    return (
      rep.fullName?.toLowerCase().includes(q) ||
      rep.employeeId?.toLowerCase().includes(q) ||
      rep.nic?.toLowerCase().includes(q) ||
      rep.email?.toLowerCase().includes(q) ||
      rep.phone?.toLowerCase().includes(q) ||
      rep.address?.toLowerCase().includes(q) ||
      rep.status?.toLowerCase().includes(q)
    );
  });

  return (
    <>
      {/* Bootstrap Icons CDN */}
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" />
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: '#232733', minHeight: 60 }}>
        <div className="container-fluid">
          <span className="navbar-brand fw-bold fs-3" style={{ color: 'white' }}>Agency System</span>
          <div className="d-flex ms-auto align-items-center">
            <button className="btn btn-secondary ms-2" onClick={handleBack}>
              Back to Dashboard
            </button>
          </div>
        </div>
      </nav>
      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">Sales Representatives</h2>
          <button className="btn btn-success" onClick={handleRegister}>Register New Sales Rep</button>
        </div>
        <div className="row mb-3 justify-content-center">
          <div className="col-md-6 col-lg-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search sales reps..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Employee ID</th>
                <th>NIC</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReps.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center text-muted">No sales reps found.</td>
                </tr>
              ) : (
                filteredReps.map((rep, idx) => (
                  <tr key={idx}>
                    {editIdx === idx ? (
                      <>
                        <td><input type="text" className="form-control" name="fullName" value={editForm.fullName} onChange={handleEditChange} /></td>
                        <td><input type="text" className="form-control" name="employeeId" value={editForm.employeeId} readOnly /></td>
                        <td><input type="text" className="form-control" name="nic" value={editForm.nic} onChange={handleEditChange} /></td>
                        <td><input type="email" className="form-control" name="email" value={editForm.email} onChange={handleEditChange} /></td>
                        <td><input type="text" className="form-control" name="phone" value={editForm.phone} onChange={handleEditChange} /></td>
                        <td><input type="text" className="form-control" name="address" value={editForm.address} onChange={handleEditChange} /></td>
                        <td><input type="text" className="form-control" name="status" value={editForm.status} onChange={handleEditChange} /></td>
                        <td>
                          <button className="btn btn-link p-0 me-2" aria-label="Save" onClick={() => handleEditSave(idx)}>
                            <i className="bi bi-check-circle text-success fs-5"></i>
                          </button>
                          <button className="btn btn-link p-0" aria-label="Cancel" onClick={handleEditCancel}>
                            <i className="bi bi-x-circle text-secondary fs-5"></i>
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{rep.fullName}</td>
                        <td>{rep.employeeId}</td>
                        <td>{rep.nic}</td>
                        <td>{rep.email}</td>
                        <td>{rep.phone}</td>
                        <td>{rep.address}</td>
                        <td>{rep.status}</td>
                        <td>
                          <button className="btn btn-link p-0 me-2" aria-label="Edit" onClick={() => handleEdit(idx)}>
                            <i className="bi bi-pencil-square text-warning fs-5"></i>
                          </button>
                          <button className="btn btn-link p-0" aria-label="Delete" onClick={() => handleDelete(idx)}>
                            <i className="bi bi-trash text-danger fs-5"></i>
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default SalesRepDashboard; 