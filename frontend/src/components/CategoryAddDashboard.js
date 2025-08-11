import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CategoryAddDashboard() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [editIdx, setEditIdx] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('categories') || '[]');
    setCategories(stored);
  }, []);

  const handleBack = () => {
    navigate('/admin-dashboard');
  };

  const handleAdd = () => {
    navigate('/category-add-form');
  };

  const handleEdit = (idx) => {
    setEditIdx(idx);
    setEditValue(categories[idx]);
    setError('');
  };

  const handleEditChange = (e) => {
    setEditValue(e.target.value);
    setError('');
  };

  const handleEditSave = (idx) => {
    const trimmed = editValue.trim();
    if (!trimmed) {
      setError('Category name is required');
      return;
    }
    if (categories.some((cat, i) => i !== idx && cat.toLowerCase() === trimmed.toLowerCase())) {
      setError('Category already exists');
      return;
    }
    const updated = categories.map((cat, i) => (i === idx ? trimmed : cat));
    setCategories(updated);
    localStorage.setItem('categories', JSON.stringify(updated));
    setEditIdx(null);
    setEditValue('');
    setError('');
  };

  const handleEditCancel = () => {
    setEditIdx(null);
    setEditValue('');
    setError('');
  };

  const handleDelete = (idx) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      const updated = categories.filter((_, i) => i !== idx);
      setCategories(updated);
      localStorage.setItem('categories', JSON.stringify(updated));
    }
  };

  // Filter categories by search
  const filteredCategories = categories.filter(cat =>
    cat.toLowerCase().includes(search.toLowerCase())
  );

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
      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">Categories</h2>
          <button className="btn btn-success" onClick={handleAdd}>Add New Category</button>
        </div>
        <div className="row mb-3 justify-content-center">
          <div className="col-md-6 col-lg-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search categories..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
        {error && <div className="alert alert-danger col-md-6 col-lg-4 mx-auto">{error}</div>}
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>Category Name</th>
                <th style={{ width: 120 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan="2" className="text-center text-muted">No categories found.</td>
                </tr>
              ) : (
                filteredCategories.map((cat, idx) => {
                  // Find the real index in the categories array
                  const realIdx = categories.findIndex(c => c === cat);
                  return (
                    <tr key={realIdx}>
                      {editIdx === realIdx ? (
                        <>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              value={editValue}
                              onChange={handleEditChange}
                            />
                          </td>
                          <td>
                            <button className="btn btn-link p-0 me-2" aria-label="Save" onClick={() => handleEditSave(realIdx)}>
                              <i className="bi bi-check-circle text-success fs-5"></i>
                            </button>
                            <button className="btn btn-link p-0" aria-label="Cancel" onClick={handleEditCancel}>
                              <i className="bi bi-x-circle text-secondary fs-5"></i>
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td>{cat}</td>
                          <td>
                            <button className="btn btn-link p-0 me-2" aria-label="Edit" onClick={() => handleEdit(realIdx)}>
                              <i className="bi bi-pencil-square text-warning fs-5"></i>
                            </button>
                            <button className="btn btn-link p-0" aria-label="Delete" onClick={() => handleDelete(realIdx)}>
                              <i className="bi bi-trash text-danger fs-5"></i>
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default CategoryAddDashboard; 