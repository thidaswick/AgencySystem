import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://agencysystem.onrender.com/admin/login', { username, password });
      navigate('/admin-dashboard');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: "#fff" }}>
      <div className="card p-4 shadow" style={{ minWidth: 400, maxWidth: 400 }}>
        <h2 className="text-center mb-4 fw-bold">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input type="text" className="form-control" value={username} onChange={e => setUsername(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <div className="text-center mt-3">
          <span>Don't have an account? </span>
          <Link to="/admin-register">Register here</Link>
        </div>
        <div className="text-center mt-2">
          <Link to="/sales-login" className="small">Log in as a sales representative</Link>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin; 