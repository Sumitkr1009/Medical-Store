import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'C:/Users/sumit/OneDrive/Desktop/MedicalStore/medicalshop/src/Styles/Register.css'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Operator',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:8080/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Registration successful:', data);
        navigate('/login');
      })
      .catch(error => {
        console.error('Error during registration:', error);
        alert('Registration failed. Please try again.');
      });
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Create Your Account</h2>
        <p>Select a role to manage your store more effectively!</p>

        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <div className="role-selection">
            <label>
              <input
                type="radio"
                name="role"
                value="Admin"
                checked={formData.role === 'Admin'}
                onChange={handleChange}
              />
              Admin
            </label>

            <label>
              <input
                type="radio"
                name="role"
                value="Operator"
                checked={formData.role === 'Operator'}
                onChange={handleChange}
              />
              Operator
            </label>
          </div>

          <button type="submit" className="register-button">
            Register
          </button>
        </form>

        <p className="redirect-text">
          Already have an account? <span onClick={() => navigate('/login')}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default Register;
