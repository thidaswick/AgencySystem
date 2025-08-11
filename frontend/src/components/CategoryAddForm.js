import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CategoryAddForm() {
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category.trim()) {
      setError('Category name is required');
      return;
    }
    const categories = JSON.parse(localStorage.getItem('categories') || '[]');
    if (categories.includes(category.trim())) {
      setError('Category already exists');
      return;
    }
    categories.push(category.trim());
    localStorage.setItem('categories', JSON.stringify(categories));
    navigate('/category-add');
  };

  const handleCancel = () => {
    navigate('/category-add');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: '#232733', minHeight: 60 }}>
        <div className="container-fluid">
          <span className="navbar-brand fw-bold fs-3" style={{ color: 'white' }}>Agency System</span>
          <div className="d-flex ms-auto align-items-center">
            <button className="btn btn-secondary ms-2" onClick={handleCancel}>
              Back to Categories
            </button>
          </div>
        </div>
      </nav>
      <div className="container py-5 d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="card p-4 shadow" style={{ maxWidth: 500, width: '100%' }}>
          <h2 className="text-center mb-4 fw-bold">Add New Category</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Category Name</label>
              <input
                type="text"
                className="form-control"
                value={category}
                onChange={e => { setCategory(e.target.value); setError(''); }}
                required
              />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="d-flex justify-content-center gap-2 mt-3">
              <button type="submit" className="btn btn-primary">Add Category</button>
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CategoryAddForm; 