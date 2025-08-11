import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function VehicleExpensesTable() {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [editIdx, setEditIdx] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('vehicleExpenses') || '[]');
    setExpenses(stored);
  }, []);

  const handleBack = () => {
    navigate('/payment-dashboard');
  };

  const handleEdit = (idx) => {
    setEditIdx(idx);
    setEditForm({ ...expenses[idx] });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSave = (idx) => {
    const updated = expenses.map((p, i) => (i === idx ? { ...editForm } : p));
    setExpenses(updated);
    localStorage.setItem('vehicleExpenses', JSON.stringify(updated));
    setEditIdx(null);
  };

  const handleEditCancel = () => {
    setEditIdx(null);
  };

  const handleDelete = (idx) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      const updated = expenses.filter((_, i) => i !== idx);
      setExpenses(updated);
      localStorage.setItem('vehicleExpenses', JSON.stringify(updated));
    }
  };

  return (
    <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" />
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: '#232733', minHeight: 60 }}>
        <div className="container-fluid">
          <span className="navbar-brand fw-bold fs-3" style={{ color: 'white' }}>Agency System</span>
          <div className="d-flex ms-auto align-items-center">
            <button className="btn btn-secondary ms-2" onClick={handleBack}>
              Back to Payment Dashboard
            </button>
          </div>
        </div>
      </nav>
      <div className="container py-5">
        <h2 className="fw-bold mb-4">Vehicle Expenses</h2>
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>Payment Reason</th>
                <th>Method</th>
                <th>Balance</th>
                <th>Date/Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center text-muted">No expenses found.</td>
                </tr>
              ) : (
                expenses.map((p, idx) => (
                  <tr key={idx}>
                    {editIdx === idx ? (
                      <>
                        <td><input type="text" className="form-control" name="reason" value={editForm.reason} onChange={handleEditChange} /></td>
                        <td>
                          <select className="form-select" name="method" value={editForm.method} onChange={handleEditChange}>
                            <option value="Cash">Cash</option>
                            <option value="Bank Transfer">Bank Transfer</option>
                            <option value="Cheque">Cheque</option>
                          </select>
                        </td>
                        <td><input type="number" className="form-control" name="balance" value={editForm.balance} onChange={handleEditChange} /></td>
                        <td><input type="text" className="form-control" name="datetime" value={editForm.datetime} readOnly /></td>
                        <td>
                          <button className="btn btn-link p-0 me-2" aria-label="Save" onClick={() => handleEditSave(idx)}><i className="bi bi-check-circle text-success fs-5"></i></button>
                          <button className="btn btn-link p-0" aria-label="Cancel" onClick={handleEditCancel}><i className="bi bi-x-circle text-secondary fs-5"></i></button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{p.reason}</td>
                        <td>{p.method}</td>
                        <td>{p.balance}</td>
                        <td>{p.datetime}</td>
                        <td>
                          <button className="btn btn-link p-0 me-2" aria-label="Edit" onClick={() => handleEdit(idx)}><i className="bi bi-pencil-square text-warning fs-5"></i></button>
                          <button className="btn btn-link p-0" aria-label="Delete" onClick={() => handleDelete(idx)}><i className="bi bi-trash text-danger fs-5"></i></button>
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

export default VehicleExpensesTable; 