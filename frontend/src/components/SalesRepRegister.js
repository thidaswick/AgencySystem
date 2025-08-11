import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SalesRepRegister() {
  const [form, setForm] = useState({
    fullName: '',
    employeeId: '',
    nic: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Auto-generate Employee ID (EMP 000X)
  useEffect(() => {
    const reps = JSON.parse(localStorage.getItem('salesReps') || '[]');
    // Find the first unused number
    let usedNumbers = reps.map(r => {
      const match = r.employeeId && r.employeeId.match(/EMP\s*(\d+)/);
      return match ? parseInt(match[1], 10) : null;
    }).filter(n => n !== null).sort((a, b) => a - b);
    let nextNum = 1;
    for (let i = 0; i < usedNumbers.length; i++) {
      if (usedNumbers[i] !== i + 1) {
        nextNum = i + 1;
        break;
      }
      nextNum = usedNumbers.length + 1;
    }
    const nextId = 'EMP ' + nextNum.toString().padStart(4, '0');
    setForm(f => ({ ...f, employeeId: nextId }));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation
    if (!form.fullName || !form.nic || !form.email || !form.phone || !form.address || !form.password || !form.confirmPassword) {
      setError('All fields are required');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    // Save to localStorage
    const reps = JSON.parse(localStorage.getItem('salesReps') || '[]');
    reps.push({
      fullName: form.fullName,
      employeeId: form.employeeId,
      nic: form.nic,
      email: form.email,
      phone: form.phone,
      address: form.address,
      password: form.password,
      status: 'Active',
      region: '',
    });
    localStorage.setItem('salesReps', JSON.stringify(reps));
    navigate('/sales-rep-dashboard');
  };

  const handleCancel = () => {
    navigate('/sales-rep-dashboard');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: '#232733', minHeight: 60 }}>
        <div className="container-fluid">
          <span className="navbar-brand fw-bold fs-3" style={{ color: 'white' }}>Agency System</span>
          <div className="d-flex ms-auto align-items-center">
            <button className="btn btn-secondary ms-2" onClick={handleCancel}>
              Back to Sales Reps
            </button>
          </div>
        </div>
      </nav>
      {/* Bootstrap Icons CDN */}
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" />
      <div className="container py-5 d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="card p-4 shadow" style={{ maxWidth: 700, width: '100%' }}>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" name="fullName" value={form.fullName} onChange={handleChange} required />
              </div>
              <div className="col-md-4">
                <label className="form-label">Employee ID</label>
                <input type="text" className="form-control" name="employeeId" value={form.employeeId} readOnly />
              </div>
              <div className="col-md-4">
                <label className="form-label">NIC</label>
                <input type="text" className="form-control" name="nic" value={form.nic} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Phone</label>
                <input type="text" className="form-control" name="phone" value={form.phone} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Address</label>
                <input type="text" className="form-control" name="address" value={form.address} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Password</label>
                <div className="input-group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    tabIndex={-1}
                    onClick={() => setShowPassword(v => !v)}
                  >
                    <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                  </button>
                </div>
              </div>
              <div className="col-12">
                <label className="form-label">Confirm Password</label>
                <div className="input-group">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    className="form-control"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    tabIndex={-1}
                    onClick={() => setShowConfirmPassword(v => !v)}
                  >
                    <i className={`bi ${showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                  </button>
                </div>
              </div>
            </div>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            <div className="d-flex justify-content-end gap-2 mt-4">
              <button type="submit" className="btn btn-primary">Register Sales Rep</button>
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SalesRepRegister; 