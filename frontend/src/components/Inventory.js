import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Inventory() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [editIdx, setEditIdx] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [search, setSearch] = useState('');

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('products') || '[]');
    setProducts(stored);
  }, []);

  const handleBack = () => {
    navigate('/supplier-dashboard');
  };

  const handleEdit = (idx) => {
    setEditIdx(idx);
    setEditForm({ ...products[idx] });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSave = (idx) => {
    const updatedProducts = products.map((product, i) => (i === idx ? { ...editForm } : product));
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setEditIdx(null);
  };

  const handleEditCancel = () => {
    setEditIdx(null);
  };

  const handleDelete = (idx) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const updated = products.filter((_, i) => i !== idx);
      setProducts(updated);
      localStorage.setItem('products', JSON.stringify(updated));
    }
  };

  // Filter products by search
  const filteredProducts = products.filter(product => {
    const q = search.toLowerCase();
    return (
      product.itemName?.toLowerCase().includes(q) ||
      product.itemCategory?.toLowerCase().includes(q) ||
      product.itemCode?.toLowerCase().includes(q) ||
      product.grmNumber?.toLowerCase().includes(q) ||
      String(product.buyingPrice).toLowerCase().includes(q) ||
      String(product.sellingPrice).toLowerCase().includes(q)
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
        <h2 className="fw-bold mb-4">Inventory</h2>
        <div className="row mb-3 justify-content-center">
          <div className="col-md-6 col-lg-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search inventory..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>Item Name</th>
                <th>Category</th>
                <th>Item Code</th>
                <th>GRM Number</th>
                <th>Buying Price</th>
                <th>Selling Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center text-muted">No products found.</td>
                </tr>
              ) : (
                filteredProducts.map((product, idx) => (
                  <tr key={idx}>
                    {editIdx === idx ? (
                      <>
                        <td><input type="text" className="form-control" name="itemName" value={editForm.itemName} onChange={handleEditChange} /></td>
                        <td><input type="text" className="form-control" name="itemCategory" value={editForm.itemCategory} onChange={handleEditChange} /></td>
                        <td><input type="text" className="form-control" name="itemCode" value={editForm.itemCode} onChange={handleEditChange} /></td>
                        <td><input type="text" className="form-control" name="grmNumber" value={editForm.grmNumber} onChange={handleEditChange} /></td>
                        <td><input type="number" className="form-control" name="buyingPrice" value={editForm.buyingPrice} onChange={handleEditChange} /></td>
                        <td><input type="number" className="form-control" name="sellingPrice" value={editForm.sellingPrice} onChange={handleEditChange} /></td>
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
                        <td>{product.itemName}</td>
                        <td>{product.itemCategory}</td>
                        <td>{product.itemCode}</td>
                        <td>{product.grmNumber}</td>
                        <td>{product.buyingPrice}</td>
                        <td>{product.sellingPrice}</td>
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

export default Inventory; 