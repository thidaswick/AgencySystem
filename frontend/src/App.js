import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import AdminRegister from './components/AdminRegister';
import DriverDashboard from './components/DriverDashboard';
import DriverRegister from './components/DriverRegister';
import SupplierDashboard from './components/SupplierDashboard';
import SupplierRegister from './components/SupplierRegister';
import SupplierDetails from './components/SupplierDetails';
import ProductAdd from './components/ProductAdd';
import VehicleDashboard from './components/VehicleDashboard';
import VehicleRegister from './components/VehicleRegister';
import VehicleExpensesForm from './components/VehicleExpensesForm';
import VehicleExpensesTable from './components/VehicleExpensesTable';

import Inventory from './components/Inventory';
import InventoryView from './components/InventoryView';
import CategoryAddDashboard from './components/CategoryAddDashboard';
import CategoryAddForm from './components/CategoryAddForm';
import SalesRepDashboard from './components/SalesRepDashboard';
import SalesRepRegister from './components/SalesRepRegister';
import PaymentDashboard from './components/PaymentDashboard';
import SalesRepPaymentForm from './components/SalesRepPaymentForm';
import SalesRepPaymentTable from './components/SalesRepPaymentTable';
import DriverPaymentForm from './components/DriverPaymentForm';
import DriverPaymentTable from './components/DriverPaymentTable';
import OtherPaymentsForm from './components/OtherPaymentsForm';
import OtherPaymentsTable from './components/OtherPaymentsTable';
import SalesRepLogin from './components/SalesRepLogin';
import SalesRepProfile from './components/SalesRepProfile';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/admin-login" replace />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-register" element={<AdminRegister />} />
          <Route path="/driver-dashboard" element={<DriverDashboard />} />
          <Route path="/driver-register" element={<DriverRegister />} />
          <Route path="/supplier-dashboard" element={<SupplierDashboard />} />
          <Route path="/supplier-register" element={<SupplierRegister />} />
          <Route path="/supplier-details" element={<SupplierDetails />} />
          <Route path="/product-add" element={<ProductAdd />} />
          <Route path="/vehicle-dashboard" element={<VehicleDashboard />} />
          <Route path="/vehicle-register" element={<VehicleRegister />} />
          <Route path="/vehicle-expenses" element={<VehicleExpensesForm />} />
          <Route path="/vehicle-expenses-table" element={<VehicleExpensesTable />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/inventory-view" element={<InventoryView />} />
          <Route path="/category-add" element={<CategoryAddDashboard />} />
          <Route path="/category-add-form" element={<CategoryAddForm />} />
          <Route path="/sales-rep-dashboard" element={<SalesRepDashboard />} />
          <Route path="/sales-rep-register" element={<SalesRepRegister />} />
          <Route path="/payment-dashboard" element={<PaymentDashboard />} />
          <Route path="/sales-rep-payment" element={<SalesRepPaymentForm />} />
          <Route path="/sales-rep-payment-table" element={<SalesRepPaymentTable />} />
          <Route path="/driver-payment" element={<DriverPaymentForm />} />
          <Route path="/driver-payment-table" element={<DriverPaymentTable />} />
          <Route path="/other-payments" element={<OtherPaymentsForm />} />
          <Route path="/other-payments-table" element={<OtherPaymentsTable />} />
          <Route path="/sales-login" element={<SalesRepLogin />} />
          <Route path="/sales-rep-profile" element={<SalesRepProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
