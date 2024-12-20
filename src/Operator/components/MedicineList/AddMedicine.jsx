import React, { useState } from 'react';
import axios from 'axios';
import 'C:/Users/sumit/OneDrive/Desktop/MedicalStore/medicalshop/src/Styles/AddMedicine.css';
import { useNavigate } from 'react-router-dom';

const AddMedicine = () => {
  const [medicine, setMedicine] = useState({
    name: '',
    manufacturer: '',
    quantity: '',
    price: '',
    expiryDate: '',
  });
  
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedicine({ ...medicine, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting medicine:', medicine);
    
    try {
      const response = await axios.post('http://localhost:8080/api/medicines', medicine, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        },
      });
      
      console.log('Response from server:', response.data);
      setMessage('Medicine added successfully!');
      setMedicine({ name: '', manufacturer: '', price: '', quantity: '', expiryDate: '' });
    } catch (error) {
      console.error('Error adding medicine:', error.response ? error.response.data : error.message);
      setMessage('Failed to add medicine. Please try again.');
    }
  };

  return (
    <div className="add-medicine-container">
      <div className="add-medicine-card">
        <h2>Add Medicine</h2>
        {message && <p className="message">{message}</p>}
        <form onSubmit={handleSubmit} className="add-medicine-form">
          <input
            type="text"
            name="name"
            placeholder="Medicine Name"
            value={medicine.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="manufacturer"
            placeholder="Manufacturer"
            value={medicine.manufacturer}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={medicine.price}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={medicine.quantity}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="expiryDate"
            value={medicine.expiryDate}
            onChange={handleChange}
            required
          />
          <button type="submit" className="add-button">
            Add Medicine
          </button>
        </form>
        <p className="redirect-text">
          Go back to <span onClick={() => navigate('/medicine-list')}>Medicine List</span>
        </p>
      </div>
    </div>
  );
};

export default AddMedicine;
