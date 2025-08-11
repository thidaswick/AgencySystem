import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function SalesRepLogin() {
  const [empId, setEmpId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const reps = JSON.parse(localStorage.getItem('salesReps') || '[]');
    const rep = reps.find(r => (r.employeeId || '').trim() === empId.trim() && r.password === password);
    if (rep) {
      localStorage.setItem('salesRepLoggedIn', rep.employeeId);
      navigate('/sales-rep-profile');
    } else {
      setError('Invalid Employee ID or Password');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: "#f5f7fa" }}>
      <div className="card p-4 shadow" style={{ minWidth: 400, maxWidth: 400 }}>
        <h2 className="text-center mb-4 fw-bold">Sales Rep Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Employee ID</label>
            <input type="text" className="form-control" value={empId} onChange={e => setEmpId(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <div className="text-center mt-3">
          <Link to="/admin-login">&larr; Back to Login</Link>
        </div>
      </div>
    </div>
  );
}

export default SalesRepLogin; 