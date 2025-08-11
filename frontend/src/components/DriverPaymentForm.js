import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function DriverPaymentForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    reason: '',
    method: '',
    balance: '',
    datetime: '',
  });

  useEffect(() => {
    const now = new Date();
    setForm(f => ({ ...f, datetime: now.toLocaleString() }));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.reason || !form.method || form.balance === '') {
      alert('Please fill all required fields.');
      return;
    }
    // Save to localStorage
    const payments = JSON.parse(localStorage.getItem('driverPayments') || '[]');
    payments.push({ ...form });
    localStorage.setItem('driverPayments', JSON.stringify(payments));
    // Redirect to table page (to be created)
    navigate('/driver-payment-table');
  };

  const handleBack = () => {
    navigate('/payment-dashboard');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: '#232733', minHeight: 60 }}>
        <div className="container-fluid">
          <span className="navbar-brand fw-bold fs-3" style={{ color: 'white' }}>Agency System</span>
          <div className="d-flex ms-auto align-items-center">
            <button className="btn btn-secondary ms-2" onClick={handleBack}>
              Back to Payment Dashboard
            </button>
          </div>
        </div>
      </nav>
      <div className="container py-5 d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="card p-4 shadow" style={{ maxWidth: 500, width: '100%' }}>
          <h2 className="text-center mb-4 fw-bold">Driver Payment</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Payment Reason</label>
              <input type="text" className="form-control" name="reason" value={form.reason} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Method</label>
              <select className="form-select" name="method" value={form.method} onChange={handleChange} required>
                <option value="">Select Method</option>
                <option value="Cash">Cash</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Cheque">Cheque</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Balance</label>
              <input type="number" className="form-control" name="balance" value={form.balance} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Date and Time</label>
              <input type="text" className="form-control" name="datetime" value={form.datetime} readOnly />
            </div>
            <div className="d-flex justify-content-end gap-2 mt-4">
              <button type="submit" className="btn btn-primary">Submit Payment</button>
              <button type="button" className="btn btn-secondary" onClick={handleBack}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default DriverPaymentForm; 