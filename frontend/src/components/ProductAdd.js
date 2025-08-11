import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 100 realistic grocery store categories, sorted alphabetically
const categories = [
  'Bagels', 'Baking Powder', 'Baking Soda', 'Barbecue Sauce', 'Basil', 'Beverages', 'Bread', 'Broths', 'Butter', 'Cabbage',
  'Cakes', 'Canned Goods', 'Carrots', 'Cereals', 'Cheese', 'Chickpeas', 'Chips', 'Chocolates', 'Coffee', 'Condiments',
  'Cookies', 'Corn', 'Crab', 'Crackers', 'Cucumbers', 'Curry Paste', 'Dairy', 'Dried Fruits', 'Eggs', 'Energy Drinks',
  'Fish', 'Flour', 'Frozen Foods', 'Fruits', 'Garlic', 'Gelatin', 'Grains', 'GRM Number', 'Herbs', 'Honey',
  'Hot Sauce', 'Ice Cream', 'Jam & Jellies', 'Juice', 'Ketchup', 'Lamb', 'Lentils', 'Lettuce', 'Lobster', 'Mayonnaise',
  'Meat', 'Milk', 'Molasses', 'Muffins', 'Mustard', 'Nuts', 'Oils', 'Onions', 'Pastries', 'Pasta',
  'Pasta Sauce', 'Peanut Butter', 'Pepper', 'Pickles', 'Pies', 'Pizza Sauce', 'Popcorn', 'Pork', 'Potatoes', 'Product Add',
  'Relishes', 'Rice', 'Salad Dressings', 'Salt', 'Sauces', 'Seafood', 'Seeds', 'Selling Price', 'Shrimp', 'Snacks',
  'Soda', 'Soy Sauce', 'Spices', 'Spinach', 'Split Peas', 'Sugar', 'Syrup', 'Tea', 'Tempeh', 'Tofu',
  'Tomatoes', 'Tortillas', 'Van', 'Vinegar', 'Water', 'Worcestershire Sauce', 'Yogurt', 'Zucchini', 'Beef', 'Chicken'
].sort((a, b) => a.localeCompare(b));

function ProductAdd() {
  const [form, setForm] = useState({
    itemName: '',
    itemCategory: '',
    itemCode: '',
    grmNumber: '',
    buyingPrice: '',
    sellingPrice: '',
  });
  const [categorySearch, setCategorySearch] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    setForm({ ...form, itemCategory: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save to localStorage for demo
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    products.push(form);
    localStorage.setItem('products', JSON.stringify(products));
    navigate('/inventory');
  };

  const handleCancel = () => {
    navigate('/supplier-dashboard');
  };

  // Filter categories by search
  const filteredCategories = categories.filter(cat =>
    cat.toLowerCase().includes(categorySearch.toLowerCase())
  );

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: '#232733', minHeight: 60 }}>
        <div className="container-fluid">
          <span className="navbar-brand fw-bold fs-3" style={{ color: 'white' }}>Agency System</span>
          <div className="d-flex ms-auto align-items-center">
            <button className="btn btn-secondary ms-2" onClick={handleCancel}>
              Back to Supplier Dashboard
            </button>
          </div>
        </div>
      </nav>
      <div className="container py-5 d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="card p-4 shadow" style={{ maxWidth: 700, width: '100%' }}>
          <h2 className="text-center mb-4 fw-bold">Add Product</h2>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-12">
                <label className="form-label">Item Name</label>
                <input type="text" className="form-control" name="itemName" value={form.itemName} onChange={handleChange} required />
              </div>
              <div className="col-12">
                <label className="form-label">Item Category</label>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Search categories..."
                  value={categorySearch}
                  onChange={e => setCategorySearch(e.target.value)}
                />
                <select
                  className="form-select"
                  name="itemCategory"
                  value={form.itemCategory}
                  onChange={handleCategoryChange}
                  required
                >
                  <option value="">Select Category</option>
                  {filteredCategories.map((cat, idx) => (
                    <option key={idx} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Item Code</label>
                <input type="text" className="form-control" name="itemCode" value={form.itemCode} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">GRM Number</label>
                <input type="text" className="form-control" name="grmNumber" value={form.grmNumber} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Buying Price</label>
                <input type="number" className="form-control" name="buyingPrice" value={form.buyingPrice} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Selling Price</label>
                <input type="number" className="form-control" name="sellingPrice" value={form.sellingPrice} onChange={handleChange} required />
              </div>
              <div className="col-12 mt-3 d-flex justify-content-center gap-2">
                <button type="submit" className="btn btn-primary">Add Product</button>
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ProductAdd; 