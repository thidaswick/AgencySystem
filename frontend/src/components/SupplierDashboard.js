import React from 'react';
import { useNavigate } from 'react-router-dom';

function SupplierDashboard() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/admin-dashboard');
  };

  const handleRegister = () => {
    navigate('/supplier-register');
  };

  const cards = [
    { title: 'Inventory', icon: '📦', onClick: () => navigate('/inventory') },
    { title: 'Supplier Details', icon: '🏢', onClick: () => navigate('/supplier-details') },
    { title: 'Product Add', icon: '➕', onClick: () => navigate('/product-add') },
  ];

  return (
    <>
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
        <div className="d-flex justify-content-end align-items-center mb-4">
          <button className="btn btn-success" onClick={handleRegister}>Register New Supplier</button>
        </div>
        <div className="row g-4 justify-content-center">
          {cards.map((card, idx) => (
            <div className="col-12 col-md-6 col-lg-4" key={idx}>
              <div
                className={`card h-100 shadow-sm text-center p-4${card.onClick ? ' card-hover' : ''}`}
                style={{ borderRadius: 20, cursor: card.onClick ? 'pointer' : 'default' }}
                onClick={card.onClick}
              >
                <div style={{ fontSize: 48, marginBottom: 10 }}>{card.icon}</div>
                <h4 className="fw-bold mb-2">{card.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default SupplierDashboard; 