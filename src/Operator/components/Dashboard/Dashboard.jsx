import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'C:/Users/sumit/OneDrive/Desktop/MedicalStore/medicalshop/src/Operator/components/Dashboard/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Dashboard</h2>
      </aside>

      <main className="main-content">
        <header className="dashboard-header">
          <h1>Welcome to the Dashboard</h1>
        </header>

        <section className="panel-container">
          <div className="admin-panel">
            <h2>Admin Panel</h2>
            <ul className="menu">
              <li onClick={() => navigate('/add-medicine')}>Add Medicine</li>
              <li onClick={() => navigate('/update-medicine/:id')}>Update Medicine</li>
            </ul>
          </div>

          <div className="operator-panel">
            <h2>Operator Panel</h2>
            <ul className="menu">
              <li onClick={() => navigate('/add-medicine-to-sale')}>Add Medicine to Sale</li>
              <li onClick={() => navigate('/sales-report')}>Sales Report</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
