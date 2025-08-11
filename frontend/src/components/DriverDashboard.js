import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function DriverDashboard() {
  const navigate = useNavigate();

  // Load drivers from localStorage
  const [drivers, setDrivers] = useState([]);
  const [search, setSearch] = useState('');
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('drivers') || '[]');
    setDrivers(stored);
  }, []);

  const [editIdx, setEditIdx] = useState(null);
  const [editForm, setEditForm] = useState({});

  const handleBack = () => {
    navigate('/admin-dashboard');
  };

  const handleRegister = () => {
    navigate('/driver-register');
  };

  const handleEdit = (idx) => {
    setEditIdx(idx);
    setEditForm({ ...drivers[idx] });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSave = (idx) => {
    const updatedDrivers = drivers.map((driver, i) => (i === idx ? { ...editForm } : driver));
    setDrivers(updatedDrivers);
    localStorage.setItem('drivers', JSON.stringify(updatedDrivers));
    setEditIdx(null);
  };

  const handleEditCancel = () => {
    setEditIdx(null);
  };

  const handleDelete = (idx) => {
    if (window.confirm('Are you sure you want to delete this driver?')) {
      const updated = drivers.filter((_, i) => i !== idx);
      setDrivers(updated);
      localStorage.setItem('drivers', JSON.stringify(updated));
    }
  };

  // Filter drivers by search
  const filteredDrivers = drivers.filter(driver => {
    const q = search.toLowerCase();
    return (
      driver.fullName.toLowerCase().includes(q) ||
      driver.email.toLowerCase().includes(q) ||
      driver.phone.toLowerCase().includes(q) ||
      driver.license.toLowerCase().includes(q) ||
      driver.nic.toLowerCase().includes(q)
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
          <h2 className="fw-bold">Driver Details</h2>
          <button className="btn btn-success" onClick={handleRegister}>Register New Driver</button>
        </div>
        <div className="row mb-3 justify-content-center">
          <div className="col-md-6 col-lg-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search drivers..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>License</th>
                <th>Experience</th>
                <th>Vehicle</th>
                <th>Address</th>
                <th>NIC</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDrivers.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center text-muted">No drivers found.</td>
                </tr>
              ) : (
                filteredDrivers.map((driver, idx) => (
                  <tr key={idx}>
                    {editIdx === idx ? (
                      <>
                        <td><input type="text" className="form-control" name="fullName" value={editForm.fullName} onChange={handleEditChange} /></td>
                        <td><input type="email" className="form-control" name="email" value={editForm.email} onChange={handleEditChange} /></td>
                        <td><input type="text" className="form-control" name="phone" value={editForm.phone} onChange={handleEditChange} /></td>
                        <td><input type="text" className="form-control" name="license" value={editForm.license} onChange={handleEditChange} /></td>
                        <td><input type="number" className="form-control" name="experience" value={editForm.experience} onChange={handleEditChange} /></td>
                        <td><input type="text" className="form-control" name="vehicle" value={editForm.vehicle} onChange={handleEditChange} /></td>
                        <td><input type="text" className="form-control" name="address" value={editForm.address} onChange={handleEditChange} /></td>
                        <td><input type="text" className="form-control" name="nic" value={editForm.nic} onChange={handleEditChange} /></td>
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
                        <td>{driver.fullName}</td>
                        <td>{driver.email}</td>
                        <td>{driver.phone}</td>
                        <td>{driver.license}</td>
                        <td>{driver.experience}</td>
                        <td>{driver.vehicle}</td>
                        <td>{driver.address}</td>
                        <td>{driver.nic}</td>
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

export default DriverDashboard; 