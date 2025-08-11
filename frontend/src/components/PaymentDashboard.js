import React from 'react';
import { useNavigate } from 'react-router-dom';

function PaymentDashboard() {
  const navigate = useNavigate();

  const cards = [
    {
      title: 'Sales Rep Payments',
      icon: <i className="bi bi-person-badge" style={{ fontSize: 48, color: '#0d6efd' }}></i>,
      btnClass: 'btn-outline-primary',
      onClick: () => navigate('/sales-rep-payment'),
    },
    {
      title: 'Driver Payments',
      icon: <i className="bi bi-cash-stack" style={{ fontSize: 48, color: '#198754' }}></i>,
      btnClass: 'btn-outline-success',
      onClick: () => {},
    },
    {
      title: 'Vehicle Expenses',
      icon: <i className="bi bi-truck" style={{ fontSize: 48, color: '#6f42c1' }}></i>,
      btnClass: 'btn-outline-dark', // dark purple fallback
      onClick: () => {},
    },
    {
      title: 'Other Payments',
      icon: <i className="bi bi-three-dots" style={{ fontSize: 48, color: '#dc3545' }}></i>,
      btnClass: 'btn-outline-danger',
      onClick: () => {},
    },
  ];

  const handleBack = () => {
    navigate('/admin-dashboard');
  };

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
      <div className="container py-5" style={{ background: '#f5f7fa', minHeight: '100vh' }}>
        <h2 className="fw-bold mb-4">Payments Dashboard</h2>
        <div className="row g-4 justify-content-center">
          {cards.map((card, idx) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={idx}>
              <div
                className="card h-100 shadow-sm text-center p-4"
                style={{ borderRadius: 20 }}
              >
                <div className="mb-3">{card.icon}</div>
                <h4 className="fw-bold mb-3">{card.title}</h4>
                <button
                  className={`btn ${card.btnClass} w-100`}
                  style={{ borderRadius: 8 }}
                  onClick={idx === 0 ? () => navigate('/sales-rep-payment-table') : idx === 1 ? () => navigate('/driver-payment-table') : idx === 2 ? () => navigate('/vehicle-expenses-table') : idx === 3 ? () => navigate('/other-payments-table') : card.onClick}
                >
                  View Details
                </button>
                <button
                  className={`btn ${card.btnClass} w-100 mt-2`}
                  style={{ borderRadius: 8 }}
                  onClick={idx === 0 ? () => navigate('/sales-rep-payment') : idx === 1 ? () => navigate('/driver-payment') : idx === 2 ? () => navigate('/vehicle-expenses') : idx === 3 ? () => navigate('/other-payments') : () => {}}
                >
                  Payment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default PaymentDashboard; 