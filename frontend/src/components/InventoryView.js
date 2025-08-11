import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function InventoryView() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('products') || '[]');
    setProducts(stored);
  }, []);

  const handleBack = () => {
    navigate('/supplier-dashboard');
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
        <h2 className="fw-bold mb-4">Inventory (Read Only)</h2>
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
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center text-muted">No products found.</td>
                </tr>
              ) : (
                filteredProducts.map((product, idx) => (
                  <tr key={idx}>
                    <td>{product.itemName}</td>
                    <td>{product.itemCategory}</td>
                    <td>{product.itemCode}</td>
                    <td>{product.grmNumber}</td>
                    <td>{product.buyingPrice}</td>
                    <td>{product.sellingPrice}</td>
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

export default InventoryView; 