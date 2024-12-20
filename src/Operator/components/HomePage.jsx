import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'C:/Users/sumit/OneDrive/Desktop/MedicalStore/medicalshop/src/Styles/HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/register');
  };

  return (
    <div className="homepage-container">
      <header className="hero-section">
        <h1>Welcome to Medical Store Management System</h1>
        <p>Your one-stop solution to manage medicines and sales efficiently.</p>
        <button className="cta-button" onClick={handleGetStarted}>
          Get Started
        </button>
      </header>

      <section className="features-section">
        <h2>Our Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Manage Medicines</h3>
            <p>Keep track of all available medicines and their stock levels effortlessly.</p>
          </div>
          <div className="feature-card">
            <h3>Sales Reports</h3>
            <p>Generate detailed reports to track sales and revenue over time.</p>
          </div>
          <div className="feature-card">
            <h3>User-Friendly Interface</h3>
            <p>Easily navigate the system with a clean and simple interface.</p>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <h2>What Our Users Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial">
            <p>"This platform has streamlined our pharmacy operations!"</p>
            <span>- Pharmacy Owner</span>
          </div>
          <div className="testimonial">
            <p>"Amazing tool to keep track of medicines and generate reports."</p>
            <span>- Store Manager</span>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2024 Medical Store Management. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
