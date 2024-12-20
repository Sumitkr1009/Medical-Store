import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './Operator/components/User/Login';
import Register from './Operator/components/User/Register';
import MedicineList from './Operator/components/MedicineList/MedicineList';
import SaleOverTime from './Operator/components/SalesReport/SaleOverTime';
import TotalEarning from './Operator/components/SalesReport/TotalEarning';
import WeeklyOverview from './Operator/components/SalesReport/WeeklyOverview';
import Home from './Operator/components/HomePage';
import Dashboard from './Operator/components/Dashboard/Dashboard';
import AddMedicine from './Operator/components/MedicineList/AddMedicine';
import UpdateMedicine from './Operator/components/MedicineList/UpdateMedicine';
import DeleteMedicine from './Operator/components/MedicineList/DeleteMedicine';
import AddMedicineToSale from './Operator/components/MedicineList/AddMedicineToSale';
import SalesReport from './Operator/components/SalesReport/SalesReport';


const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-medicine" element={<AddMedicine />}/>
          <Route path="/update-medicine/:id" element={<UpdateMedicine />} />
          <Route path="/delete-medicine" element={<DeleteMedicine />} />
          <Route path="/medicine-list" element={<MedicineList />} />
          <Route path="/sale-over-time" element={<SaleOverTime />} />
          <Route path="/total-earning" element={<TotalEarning />} />
          <Route path="/weekly-overview" element={<WeeklyOverview />} />
          <Route path="/add-medicine-to-sale" element={<AddMedicineToSale />} />
          <Route path="/sales-report" element={<SalesReport />} />
          {/* Add any additional routes here */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
