import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DriverRegister() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    license: '',
    experience: '',
    vehicle: '',
    address: '',
    nic: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save to localStorage for demo
    const drivers = JSON.parse(localStorage.getItem('drivers') || '[]');
    drivers.push(form);
    localStorage.setItem('drivers', JSON.stringify(drivers));
    navigate('/driver-dashboard');
  };

  const handleBack = () => {
    navigate('/driver-dashboard');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: '#232733', minHeight: 60 }}>
        <div className="container-fluid">
          <span className="navbar-brand fw-bold fs-3" style={{ color: 'white' }}>Agency System</span>
          <div className="d-flex ms-auto align-items-center">
            <button className="btn btn-secondary ms-2" onClick={handleBack}>
              Back to Driver Details
            </button>
          </div>
        </div>
      </nav>
      <div className="container py-5 d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="card p-4 shadow" style={{ maxWidth: 700, width: '100%' }}>
          <h2 className="text-center mb-4 fw-bold">Register New Driver</h2>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-control" name="fullName" value={form.fullName} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Phone Number</label>
                <input type="text" className="form-control" name="phone" value={form.phone} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">NIC</label>
                <input type="text" className="form-control" name="nic" value={form.nic} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">License Number</label>
                <input type="text" className="form-control" name="license" value={form.license} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Years of Experience</label>
                <input type="number" className="form-control" name="experience" value={form.experience} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Address</label>
                <input type="text" className="form-control" name="address" value={form.address} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Vehicle Type</label>
                <select className="form-select" name="vehicle" value={form.vehicle} onChange={handleChange} required>
                  <option value="">Select Vehicle Type</option>
                  <option value="Car">Car</option>
                  <option value="Van">Van</option>
                  <option value="Bus">Bus</option>
                  <option value="Lorry">Lorry</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="col-12 mt-3">
                <button type="submit" className="btn btn-primary w-100">Register Driver</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default DriverRegister; 