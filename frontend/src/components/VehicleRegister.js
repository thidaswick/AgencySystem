import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function VehicleRegister() {
  const [form, setForm] = useState({
    vehicleNumber: '',
    type: '',
    model: '',
    capacity: '',
    assignedDriver: '',
    status: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save to localStorage for demo
    const vehicles = JSON.parse(localStorage.getItem('vehicles') || '[]');
    vehicles.push(form);
    localStorage.setItem('vehicles', JSON.stringify(vehicles));
    navigate('/vehicle-dashboard');
  };

  const handleBack = () => {
    navigate('/vehicle-dashboard');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: '#232733', minHeight: 60 }}>
        <div className="container-fluid">
          <span className="navbar-brand fw-bold fs-3" style={{ color: 'white' }}>Agency System</span>
          <div className="d-flex ms-auto align-items-center">
            <button className="btn btn-secondary ms-2" onClick={handleBack}>
              Back to Vehicle Details
            </button>
          </div>
        </div>
      </nav>
      <div className="container py-5 d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="card p-4 shadow" style={{ maxWidth: 700, width: '100%' }}>
          <h2 className="text-center mb-4 fw-bold">Register New Vehicle</h2>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Vehicle Number</label>
                <input type="text" className="form-control" name="vehicleNumber" value={form.vehicleNumber} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Type</label>
                <select className="form-select" name="type" value={form.type} onChange={handleChange} required>
                  <option value="">Select Type</option>
                  <option value="Car">Car</option>
                  <option value="Van">Van</option>
                  <option value="Bus">Bus</option>
                  <option value="Lorry">Lorry</option>
                  <option value="Truck">Truck</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Model</label>
                <input type="text" className="form-control" name="model" value={form.model} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Capacity (in Kg)</label>
                <input type="number" className="form-control" name="capacity" value={form.capacity} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Assigned Driver</label>
                <input type="text" className="form-control" name="assignedDriver" value={form.assignedDriver} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Status</label>
                <select className="form-select" name="status" value={form.status} onChange={handleChange} required>
                  <option value="">Select Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Out of Service">Out of Service</option>
                </select>
              </div>
              <div className="col-12 mt-3 d-flex justify-content-center gap-2">
                <button type="submit" className="btn btn-primary">Register Vehicle</button>
                <button type="button" className="btn btn-secondary" onClick={handleBack}>Cancel</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default VehicleRegister; 