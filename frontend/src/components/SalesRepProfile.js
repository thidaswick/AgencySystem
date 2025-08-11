import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function SalesRepProfile() {
  const [rep, setRep] = useState(null);
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();
  const fileInputRef = useRef();

  useEffect(() => {
    const empId = localStorage.getItem('salesRepLoggedIn');
    const reps = JSON.parse(localStorage.getItem('salesReps') || '[]');
    const found = reps.find(r => (r.employeeId || '').trim() === (empId || '').trim());
    if (!found) {
      navigate('/sales-login');
    } else {
      setRep(found);
      // Load photo if exists
      const savedPhoto = localStorage.getItem('salesRepPhoto_' + found.employeeId);
      if (savedPhoto) setPhoto(savedPhoto);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('salesRepLoggedIn');
    navigate('/sales-login');
  };

  const handleAvatarClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = function (evt) {
        setPhoto(evt.target.result);
        if (rep && rep.employeeId) {
          localStorage.setItem('salesRepPhoto_' + rep.employeeId, evt.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  if (!rep) return null;

  return (
    <div style={{ background: '#f5f7fa', minHeight: '100vh', padding: '40px 0', fontFamily: 'Segoe UI, Arial, sans-serif' }}>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: '#232733', minHeight: 60 }}>
        <div className="container-fluid">
          <span className="navbar-brand fw-bold fs-3" style={{ color: 'white' }}>Agency System</span>
          <div className="d-flex ms-auto align-items-center">
            <button className="btn btn-danger ms-2" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>
      <div className="container">
        <div className="mx-auto" style={{ maxWidth: 1200 }}>
          <div className="card shadow position-relative" style={{ borderRadius: 24, overflow: 'hidden', minHeight: 180, background: '#fff', marginBottom: 32 }}>
            {/* Banner */}
            <div style={{ background: '#e9ecef', height: 120 }}></div>
            {/* Avatar and info */}
            <div className="d-flex align-items-center" style={{ marginTop: -60, padding: '0 32px 32px 32px' }}>
              <div
                style={{ width: 120, height: 120, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginRight: 32, border: '4px solid #fff', cursor: 'pointer', overflow: 'hidden', position: 'relative' }}
                onClick={handleAvatarClick}
                title="Click to upload profile photo"
              >
                {photo ? (
                  <>
                    <img src={photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                    <button
                      type="button"
                      onClick={e => { e.stopPropagation(); setPhoto(null); if (rep && rep.employeeId) localStorage.removeItem('salesRepPhoto_' + rep.employeeId); }}
                      style={{ position: 'absolute', top: 6, right: 6, background: 'rgba(255,255,255,0.85)', border: 'none', borderRadius: '50%', padding: 4, cursor: 'pointer', boxShadow: '0 1px 4px rgba(0,0,0,0.10)' }}
                      title="Remove photo"
                    >
                      <i className="bi bi-trash text-danger" style={{ fontSize: 18 }}></i>
                    </button>
                  </>
                ) : (
                  <span style={{ fontSize: 70 }} role="img" aria-label="avatar">👨‍💼</span>
                )}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handlePhotoChange}
                />
              </div>
              <div className="flex-grow-1">
                <h1 className="fw-bold mb-2" style={{ fontSize: 32, textAlign: 'left' }}>{rep.fullName}</h1>
                <div className="fs-5" style={{ textAlign: 'left', background: '#fff', marginTop: 12, padding: '10px 18px', borderRadius: 10, boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
                  <b>Employee ID:</b> {rep.employeeId} &nbsp;&nbsp;
                  <b>NIC:</b> {rep.nic} &nbsp;&nbsp;
                  <b>Email:</b> {rep.email} &nbsp;&nbsp;
                  <b>Phone:</b> {rep.phone} &nbsp;&nbsp;
                  <b>Address:</b> {rep.address}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Main content: Attendance left, 2x2 grid right */}
        <div className="row justify-content-center" style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Attendance Tracking (left) */}
          <div className="col-12 col-lg-6 mb-4">
            <AttendanceTracking rep={rep} />
          </div>
          {/* 2x2 grid of cards (right) */}
          <div className="col-12 col-lg-6 mb-4 d-flex flex-column h-100">
            <div className="row g-3 h-100">
              <div className="col-12 col-md-6 h-100">
                <div className="card text-center shadow-sm h-100" style={{ borderRadius: 16, minHeight: 170, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 24 }}>
                  <div style={{ fontSize: 36, color: '#0d6efd', marginBottom: 8 }}><i className="bi bi-pie-chart"></i></div>
                  <div className="fw-bold fs-5">Overview</div>
                  <div className="text-muted">Welcome, {rep.fullName}!</div>
                </div>
              </div>
              <div className="col-12 col-md-6 h-100">
                <div className="card text-center shadow-sm h-100" style={{ borderRadius: 16, minHeight: 170, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 24 }}>
                  <div style={{ fontSize: 36, color: '#198754', marginBottom: 8 }}><i className="bi bi-cart"></i></div>
                  <div className="fw-bold fs-5">Total Sales</div>
                  <div className="text-muted">0</div>
                </div>
              </div>
              <div className="col-12 col-md-6 h-100">
                <div className="card text-center shadow-sm h-100" style={{ borderRadius: 16, minHeight: 170, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 24 }}>
                  <div style={{ fontSize: 36, color: '#0dcaf0', marginBottom: 8 }}><i className="bi bi-cash-coin"></i></div>
                  <div className="fw-bold fs-5">Sales Income</div>
                  <div className="text-muted">LKR 0.00</div>
                </div>
              </div>
              <div className="col-12 col-md-6 h-100">
                <div className="card text-center shadow-sm h-100" style={{ borderRadius: 16, minHeight: 170, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 24 }}>
                  <div style={{ fontSize: 36, color: '#0d6efd', marginBottom: 8 }}><i className="bi bi-receipt"></i></div>
                  <div className="fw-bold fs-5">Paysheet</div>
                  <div className="text-muted">-</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// AttendanceTracking widget
function AttendanceTracking({ rep }) {
  const [now, setNow] = React.useState(new Date());
  const [attendance, setAttendance] = React.useState({});
  const [status, setStatus] = React.useState('Absent');
  const [message, setMessage] = React.useState('');
  const [refreshKey, setRefreshKey] = React.useState(0);

  // Helper: get today's key
  function getKey() {
    const today = new Date();
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, '0');
    const d = String(today.getDate()).padStart(2, '0');
    return `attendance_${rep.employeeId}_${y}-${m}-${d}`;
  }

  // Load attendance from localStorage
  React.useEffect(() => {
    const key = getKey();
    const data = JSON.parse(localStorage.getItem(key) || '{}');
    setAttendance(data);
    // Set status
    if (data.clockIn && !data.clockOut) {
      if (data.lunchIn && !data.lunchOut) setStatus('On Lunch');
      else setStatus('Present');
    } else if (data.clockIn && data.clockOut) {
      setStatus('Completed');
    } else {
      setStatus('Absent');
    }
  }, [rep, refreshKey]);

  // Update time every second
  React.useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Refresh handler
  const handleRefresh = () => {
    setNow(new Date());
    setRefreshKey(k => k + 1);
    setMessage('');
  };

  // Clock In
  const handleClockIn = () => {
    if (attendance.clockIn) return;
    const t = now.toLocaleTimeString();
    const newData = { ...attendance, clockIn: t };
    localStorage.setItem(getKey(), JSON.stringify(newData));
    setAttendance(newData);
    setStatus('Present');
    setMessage('Clocked in!');
  };
  // Lunch In
  const handleLunchIn = () => {
    if (!attendance.clockIn || attendance.lunchIn) return;
    const t = now.toLocaleTimeString();
    const newData = { ...attendance, lunchIn: t };
    localStorage.setItem(getKey(), JSON.stringify(newData));
    setAttendance(newData);
    setStatus('On Lunch');
    setMessage('Lunch started!');
  };
  // Lunch Out
  const handleLunchOut = () => {
    if (!attendance.lunchIn || attendance.lunchOut) return;
    const t = now.toLocaleTimeString();
    const newData = { ...attendance, lunchOut: t };
    localStorage.setItem(getKey(), JSON.stringify(newData));
    setAttendance(newData);
    setStatus('Present');
    setMessage('Lunch ended!');
  };
  // Clock Out
  const handleClockOut = () => {
    if (!attendance.clockIn || attendance.clockOut) return;
    const t = now.toLocaleTimeString();
    const newData = { ...attendance, clockOut: t };
    localStorage.setItem(getKey(), JSON.stringify(newData));
    setAttendance(newData);
    setStatus('Completed');
    setMessage('Clocked out!');
  };

  // UI helpers
  const cardStyle = { borderRadius: 16, marginBottom: 16, padding: 18, fontWeight: 500 };
  return (
    <div className="mt-5" style={{ maxWidth: 420, minWidth: 340 }}>
      <div className="card p-4 shadow" style={{ borderRadius: 24, minHeight: 350, display: 'flex', flexDirection: 'column', justifyContent: 'stretch' }}>
        <h2 className="fw-bold text-center mb-3">Attendance Tracking</h2>
        <div className="d-flex align-items-center mb-2" style={{ fontSize: 20 }}>
          <i className="bi bi-clock-history me-2"></i>
          <span>{now.toLocaleTimeString()}</span>
          <span className="ms-auto"><a href="#" onClick={e => { e.preventDefault(); handleRefresh(); }} style={{ color: '#198754', textDecoration: 'underline', fontWeight: 500 }}><i className="bi bi-arrow-clockwise"></i> Refresh</a></span>
        </div>
        <div style={{ ...cardStyle, background: '#eaf2ff', color: '#2563eb' }} className="text-center">
          <div style={{ fontWeight: 600, fontSize: 18 }}>Clock In</div>
          <div style={{ fontSize: 24, letterSpacing: 2 }}>{attendance.clockIn || '--:--'}</div>
        </div>
        <div style={{ ...cardStyle, background: '#f8eaff', color: '#222' }} className="text-center">
          <div style={{ fontWeight: 600, fontSize: 18 }}>Clock Out</div>
          <div style={{ fontSize: 24, letterSpacing: 2 }}>{attendance.clockOut || '--:--'}</div>
        </div>
        <div style={{ ...cardStyle, background: '#fffbe6', color: '#b68900' }} className="text-center">
          <div style={{ fontWeight: 600, fontSize: 18 }}>Lunch In</div>
          <div style={{ fontSize: 20, letterSpacing: 2 }}>{attendance.lunchIn || '--:--'}</div>
        </div>
        <div style={{ ...cardStyle, background: '#eafff2', color: '#009e60' }} className="text-center">
          <div style={{ fontWeight: 600, fontSize: 18 }}>Lunch Out</div>
          <div style={{ fontSize: 20, letterSpacing: 2 }}>{attendance.lunchOut || '--:--'}</div>
        </div>
        <div style={{ ...cardStyle, background: status === 'Present' ? '#eafff2' : status === 'On Lunch' ? '#fffbe6' : status === 'Completed' ? '#eaf2ff' : '#f8eaff', color: '#222' }} className="text-center">
          <div style={{ fontWeight: 600, color: status === 'Present' ? '#009e60' : status === 'On Lunch' ? '#b68900' : status === 'Completed' ? '#2563eb' : '#b68900' }}>Current Status</div>
          <div className="fw-bold" style={{ fontSize: 24 }}>{status}</div>
        </div>
        {message && <div className="alert alert-info text-center py-2" style={{ fontSize: 16 }}>{message}</div>}
        <div className="d-flex gap-2 mt-3">
          <button className="btn btn-success flex-fill" style={{ fontWeight: 500 }} onClick={handleClockIn} disabled={!!attendance.clockIn}><i className="bi bi-clock me-2"></i>Clock In</button>
          <button className="btn btn-warning flex-fill" style={{ fontWeight: 500, color: '#fff', background: '#b68900', border: 'none' }} onClick={handleLunchIn} disabled={!attendance.clockIn || !!attendance.lunchIn || !!attendance.lunchOut || !!attendance.clockOut}><i className="bi bi-cup-straw me-2"></i>Lunch In</button>
        </div>
        <div className="d-flex gap-2 mt-2">
          <button className="btn btn-info flex-fill" style={{ fontWeight: 500, color: '#2563eb', background: '#eaf2ff', border: 'none' }} onClick={handleLunchOut} disabled={!attendance.lunchIn || !!attendance.lunchOut || !!attendance.clockOut}><i className="bi bi-cup-straw me-2"></i>Lunch Out</button>
          <button className="btn btn-dark flex-fill" style={{ fontWeight: 500 }} onClick={handleClockOut} disabled={!attendance.clockIn || !!attendance.clockOut}><i className="bi bi-clock me-2"></i>Clock Out</button>
        </div>
      </div>
      {/* Bootstrap Icons CDN */}
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" />
    </div>
  );
}

export default SalesRepProfile; 