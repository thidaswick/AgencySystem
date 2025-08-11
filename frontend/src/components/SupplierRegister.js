import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SupplierRegister() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    business: '',
    address: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save to localStorage for demo
    const suppliers = JSON.parse(localStorage.getItem('suppliers') || '[]');
    suppliers.push(form);
    localStorage.setItem('suppliers', JSON.stringify(suppliers));
    navigate('/supplier-details');
  };

  const handleCancel = () => {
    navigate('/supplier-dashboard');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: '#232733', minHeight: 60 }}>
        <div className="container-fluid">
          <span className="navbar-brand fw-bold fs-3" style={{ color: 'white' }}>Agency System</span>
          <div className="d-flex ms-auto align-items-center">
            <button className="btn btn-secondary ms-2" onClick={handleCancel}>
              Back to Supplier Dashboard
            </button>
          </div>
        </div>
      </nav>
      <div className="container py-5 d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="card p-4 shadow" style={{ maxWidth: 700, width: '100%' }}>
          <h2 className="text-center mb-4 fw-bold">Register New Supplier</h2>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-12">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-control" name="fullName" value={form.fullName} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Phone Number</label>
                <input type="text" className="form-control" name="phone" value={form.phone} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Business Name</label>
                <input type="text" className="form-control" name="business" value={form.business} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Address</label>
                <input type="text" className="form-control" name="address" value={form.address} onChange={handleChange} required />
              </div>
              <div className="col-12 mt-3 d-flex justify-content-center gap-2">
                <button type="submit" className="btn btn-primary">Register Supplier</button>
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SupplierRegister; 