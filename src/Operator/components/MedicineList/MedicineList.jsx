import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import 'C:/Users/sumit/OneDrive/Desktop/MedicalStore/medicalshop/src/Styles/MedicineList.css';

const MedicineList = ({ addToBill }) => {
    const navigate = useNavigate(); 
    const [medicines, setMedicines] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMedicines = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/medicines', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
                    },
                });
                setMedicines(response.data);
            } catch (err) {
                setError('Failed to fetch medicines. Please try again later.');
                console.error(err);
            }
        };
        fetchMedicines();
    }, []);

    return (
        <div className="medicine-list">
            <h2>Medicine List</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Manufacturer</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Expiry Date</th>
                    </tr>
                </thead>
                <tbody>
                    {medicines.map((medicine) => (
                        <tr key={medicine.id}>
                            <td>{medicine.name}</td>
                            <td>{medicine.manufacturer}</td>
                            <td>₹{medicine.price}</td>
                            <td>{medicine.quantity}</td>
                            <td>{medicine.expiryDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MedicineList;
