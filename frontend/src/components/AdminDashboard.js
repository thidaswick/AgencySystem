import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();
  const handleLogout = () => {
    window.location.href = '/admin-login';
  };

  const cards = [
    { title: 'Driver Details', desc: 'View and manage driver information and assignments', icon: '🚗', onClick: () => navigate('/driver-dashboard') },
    { title: 'Suppliers', desc: 'Manage and monitor suppliers activities', icon: '🏭', onClick: () => navigate('/supplier-dashboard') },
    { title: 'Vehicle Details', desc: 'Manage and track delivery vehicles', icon: '🚚', onClick: () => navigate('/vehicle-dashboard') },
    { title: 'Inventory', desc: 'View and manage inventory items', icon: '📦', onClick: () => navigate('/inventory-view') },
    { title: 'Payments', desc: 'Manage and track payments', icon: '💳', onClick: () => navigate('/payment-dashboard') },
    { title: 'Sales Representatives', desc: 'Manage sales team and track performance', icon: '👥', onClick: () => navigate('/sales-rep-dashboard') },
    { title: 'Category Add', desc: 'Add and manage categories', icon: '➕', onClick: () => navigate('/category-add') },
  ];

  return (
    <>
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
      <div className="container py-5" style={{ background: '#f5f7fa', minHeight: '100vh' }}>
        <div className="row g-4 justify-content-center">
          {cards.map((card, idx) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={idx}>
              <div
                className={`card h-100 shadow-sm text-center p-3${card.onClick ? ' card-hover' : ''}`}
                style={{ borderRadius: 20, cursor: card.onClick ? 'pointer' : 'default' }}
                onClick={card.onClick}
              >
                <div style={{ fontSize: 48, marginBottom: 10 }}>{card.icon}</div>
                <h4 className="fw-bold mb-2">{card.title}</h4>
                <p className="text-muted mb-0" style={{ minHeight: 48 }}>{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default AdminDashboard; 