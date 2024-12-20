import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'C:/Users/sumit/OneDrive/Desktop/MedicalStore/medicalshop/src/Styles/Login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Logging in:', credentials);
    try {
      const response = await axios.post('http://localhost:8080/api/login', credentials, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Login response:', response.data);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        setMessage('Login successful!');
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login failed:', error);
      const errorMessage = error.response ? error.response.data : 'Invalid user'; 
      setMessage(errorMessage); 
    }
  };
  

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back!</h2>
        <p>Please login to your account</p>
        {message && <p className={message.includes('successful') ? 'success-message' : 'error-message'}>{message}</p>} {/* Display message */}
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={credentials.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <p className="forgot-password">Forgot Password?</p>
        <p className="register-redirect">
          Don't have an account?{' '}
          <span onClick={() => navigate('/register')}>Register here</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
