import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'C:/Users/sumit/OneDrive/Desktop/MedicalStore/medicalshop/src/Styles/AddMedicineToSale.css';

const AddMedicineToSale = () => {
  const navigate = useNavigate();
  const [medicines, setMedicines] = useState([]);
  const [bill, setBill] = useState([]);
  const [gstRate, setGstRate] = useState(5);
  const [discountRate, setDiscountRate] = useState(0);
  const [saleDate, setSaleDate] = useState(new Date().toISOString().split("T")[0]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/medicines', {
          headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` },
        });
        setMedicines(response.data);
      } catch (error) {
        console.error('Error fetching medicines:', error);
        setMessage('Failed to fetch medicines. Please try again.');
      }
    };
    fetchMedicines();
  }, []);

  const addToBill = (medicine) => {
    setBill((prevBill) => {
      const existingItem = prevBill.find((item) => item.id === medicine.id);
      return existingItem
        ? prevBill.map((item) =>
            item.id === medicine.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        : [...prevBill, { ...medicine, quantity: 1 }];
    });
  };

  const removeFromBill = (id) => {
    setBill((prevBill) => prevBill.filter((item) => item.id !== id));
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setBill((prevBill) =>
      prevBill.map((item) =>
        item.id === id ? { ...item, quantity: parseInt(newQuantity) } : item
      )
    );
  };

  const calculateTotals = () => {
    const total = bill.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const gst = (total * gstRate) / 100;
    const discount = (total * discountRate) / 100;
    const finalPrice = total + gst - discount;
    return { total, gst, discount, finalPrice };
  };

  const { total, gst, discount, finalPrice } = calculateTotals();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (bill.length === 0) {
      setMessage('Please add items to the bill before completing the sale.');
      return;
    }

    const saleData = { saleItems: bill, total, gst, discount, finalPrice, saleDate };

    try {
      const response = await axios.post('http://localhost:8080/api/sales', saleData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        },
      });
      setMessage('Sale completed successfully!');
      setBill([]);
    } catch (error) {
      console.error('Error completing sale:', error);
      setMessage(
        `Failed to complete sale: ${error.response?.data.message || 'Please try again.'}`
      );
    }
  };

  useEffect(() => {
    calculateTotals();
  }, [discountRate, bill]);

  return (
    <div className="add-sale-container">
      <div className="add-sale-card">
        <h2>Add Medicine to Sale</h2>
        {message && (
          <p className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>
            {message}
          </p>
        )}

        <h3>Available Medicines</h3>
        <ul className="medicine-list">
          {medicines.map((medicine) => (
            <li key={medicine.id}>
              <div>
                <strong>{medicine.name}</strong>  ₹{medicine.price}
                <br />
                <span>Expiry Date: {medicine.expiryDate}</span>
                <br />
                <span>Manufacturer: {medicine.manufacturer}</span>
                <br />
                <button onClick={() => addToBill(medicine)}>Add to Bill</button>
              </div>
            </li>
          ))}
        </ul>

        <h3>Bill</h3>
        {bill.length > 0 ? (
          <div className="bill">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {bill.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>₹{item.price}</td>
                    <td>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                        min="1"
                      />
                    </td>
                    <td>₹{item.price * item.quantity}</td>
                    <td>
                      <button onClick={() => removeFromBill(item.id)}>Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="summary">
              <p>Total: ₹{total}</p>
              <p>GST: ₹{gst}</p>
              <p>Discount: -₹{discount}</p>
              <p>Final Price: ₹{finalPrice}</p>
            </div>

            <div className="discount-rate">
              <label htmlFor="discount-rate">Discount Rate (%):</label>
              <input
                type="number"
                id="discount-rate"
                value={discountRate}
                onChange={(e) => setDiscountRate(e.target.value)}
                min="0"
                max="100"
              />
            </div>

            <div className="sale-date">
              <label htmlFor="sale-date">Sale Date:</label>
              <input
                type="date"
                id="sale-date"
                value={saleDate}
                onChange={(e) => setSaleDate(e.target.value)}
              />
            </div>

            <button onClick={handleSubmit} className="complete-sale-button">
              Complete Sale
            </button>
          </div>
        ) : (
          <p>No items in the bill.</p>
        )}

        <p className="redirect-text">
          Go back to{' '}
          <span onClick={() => navigate('/sale-overview')} className="link-text">
            Sale Overview
          </span>
        </p>
      </div>
    </div>
  );
};

export default AddMedicineToSale;
