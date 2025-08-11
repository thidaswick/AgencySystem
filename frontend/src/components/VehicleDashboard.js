import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function VehicleDashboard() {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [search, setSearch] = useState('');
  const [editIdx, setEditIdx] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('vehicles') || '[]');
    setVehicles(stored);
  }, []);

  const handleBack = () => {
    navigate('/admin-dashboard');
  };

  const handleRegister = () => {
    navigate('/vehicle-register');
  };

  const handleEdit = (idx) => {
    setEditIdx(idx);
    setEditForm({ ...vehicles[idx] });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSave = (idx) => {
    const updatedVehicles = vehicles.map((vehicle, i) => (i === idx ? { ...editForm } : vehicle));
    setVehicles(updatedVehicles);
    localStorage.setItem('vehicles', JSON.stringify(updatedVehicles));
    setEditIdx(null);
  };

  const handleEditCancel = () => {
    setEditIdx(null);
  };

  const handleDelete = (idx) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      const updated = vehicles.filter((_, i) => i !== idx);
      setVehicles(updated);
      localStorage.setItem('vehicles', JSON.stringify(updated));
    }
  };

  // Filter vehicles by search
  const filteredVehicles = vehicles.filter(vehicle => {
    const q = search.toLowerCase();
    return (
      vehicle.vehicleNumber?.toLowerCase().includes(q) ||
      vehicle.type?.toLowerCase().includes(q) ||
      vehicle.model?.toLowerCase().includes(q) ||
      String(vehicle.capacity).toLowerCase().includes(q) ||
      vehicle.assignedDriver?.toLowerCase().includes(q) ||
      vehicle.status?.toLowerCase().includes(q)
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
          <h2 className="fw-bold">Vehicle Details</h2>
          <button className="btn btn-success" onClick={handleRegister}>Register New Vehicle</button>
        </div>
        <div className="row mb-3 justify-content-center">
          <div className="col-md-6 col-lg-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search vehicles..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>Vehicle Number</th>
                <th>Type</th>
                <th>Model</th>
                <th>Capacity</th>
                <th>Assigned Driver</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVehicles.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center text-muted">No vehicles found.</td>
                </tr>
              ) : (
                filteredVehicles.map((vehicle, idx) => (
                  <tr key={idx}>
                    {editIdx === idx ? (
                      <>
                        <td><input type="text" className="form-control" name="vehicleNumber" value={editForm.vehicleNumber} onChange={handleEditChange} /></td>
                        <td><input type="text" className="form-control" name="type" value={editForm.type} onChange={handleEditChange} /></td>
                        <td><input type="text" className="form-control" name="model" value={editForm.model} onChange={handleEditChange} /></td>
                        <td><input type="number" className="form-control" name="capacity" value={editForm.capacity} onChange={handleEditChange} /></td>
                        <td><input type="text" className="form-control" name="assignedDriver" value={editForm.assignedDriver} onChange={handleEditChange} /></td>
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
                        <td>{vehicle.vehicleNumber}</td>
                        <td>{vehicle.type}</td>
                        <td>{vehicle.model}</td>
                        <td>{vehicle.capacity}</td>
                        <td>{vehicle.assignedDriver}</td>
                        <td>{vehicle.status}</td>
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

export default VehicleDashboard; 