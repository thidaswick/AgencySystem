import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SupplierDetails() {
  const navigate = useNavigate();
  const [suppliers, setSuppliers] = useState([]);
  const [editIdx, setEditIdx] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [search, setSearch] = useState('');

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('suppliers') || '[]');
    setSuppliers(stored);
  }, []);

  const handleBack = () => {
    navigate('/supplier-dashboard');
  };

  const handleEdit = (idx) => {
    setEditIdx(idx);
    setEditForm({ ...suppliers[idx] });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSave = (idx) => {
    const updatedSuppliers = suppliers.map((supplier, i) => (i === idx ? { ...editForm } : supplier));
    setSuppliers(updatedSuppliers);
    localStorage.setItem('suppliers', JSON.stringify(updatedSuppliers));
    setEditIdx(null);
  };

  const handleEditCancel = () => {
    setEditIdx(null);
  };

  const handleDelete = (idx) => {
    if (window.confirm('Are you sure you want to delete this supplier?')) {
      const updated = suppliers.filter((_, i) => i !== idx);
      setSuppliers(updated);
      localStorage.setItem('suppliers', JSON.stringify(updated));
    }
  };

  // Filter suppliers by search
  const filteredSuppliers = suppliers.filter(supplier => {
    const q = search.toLowerCase();
    return (
      supplier.fullName?.toLowerCase().includes(q) ||
      supplier.email?.toLowerCase().includes(q) ||
      supplier.phone?.toLowerCase().includes(q) ||
      supplier.business?.toLowerCase().includes(q) ||
      supplier.address?.toLowerCase().includes(q)
    );
  });

  return (
    <>
      {/* Bootstrap Icons CDN */}
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" />
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: '#232733', minHeight: 60 }}>
        <div className="container-fluid">
          <span className="navbar-brand fw-bold fs-3" style={{ color: 'white' }}>Agency System</span>
          <div className="d-flex ms-auto align-items-center">
            <button className="btn btn-secondary ms-2" onClick={handleBack}>
              Back to Supplier Dashboard
            </button>
          </div>
        </div>
      </nav>
      <div className="container py-5">
        <h2 className="fw-bold mb-4">Registered Suppliers</h2>
        <div className="row mb-3 justify-content-center">
          <div className="col-md-6 col-lg-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search suppliers..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Business Name</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSuppliers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center text-muted">No suppliers found.</td>
                </tr>
              ) : (
                filteredSuppliers.map((supplier, idx) => (
                  <tr key={idx}>
                    {editIdx === idx ? (
                      <>
                        <td><input type="text" className="form-control" name="fullName" value={editForm.fullName} onChange={handleEditChange} /></td>
                        <td><input type="email" className="form-control" name="email" value={editForm.email} onChange={handleEditChange} /></td>
                        <td><input type="text" className="form-control" name="phone" value={editForm.phone} onChange={handleEditChange} /></td>
                        <td><input type="text" className="form-control" name="business" value={editForm.business} onChange={handleEditChange} /></td>
                        <td><input type="text" className="form-control" name="address" value={editForm.address} onChange={handleEditChange} /></td>
                        <td>
                          <button className="btn btn-link p-0 me-2" aria-label="Save" onClick={() => handleEditSave(idx)}>
                            <i className="bi bi-check-circle text-success fs-5"></i>
                          </button>
                          <button className="btn btn-link p-0" aria-label="Cancel" onClick={handleEditCancel}>
                            <i className="bi bi-x-circle text-secondary fs-5"></i>
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{supplier.fullName}</td>
                        <td>{supplier.email}</td>
                        <td>{supplier.phone}</td>
                        <td>{supplier.business}</td>
                        <td>{supplier.address}</td>
                        <td>
                          <button className="btn btn-link p-0 me-2" aria-label="Edit" onClick={() => handleEdit(idx)}>
                            <i className="bi bi-pencil-square text-warning fs-5"></i>
                          </button>
                          <button className="btn btn-link p-0" aria-label="Delete" onClick={() => handleDelete(idx)}>
                            <i className="bi bi-trash text-danger fs-5"></i>
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default SupplierDetails; 