import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import 'C:/Users/sumit/OneDrive/Desktop/MedicalStore/medicalshop/src/Styles/UpdateMedicine.css'; // Ensure correct CSS path

const UpdateMedicine = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get medicine ID from URL if provided

    // State to manage list and update form visibility
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [selectedMedicine, setSelectedMedicine] = useState(null);

    // States for medicines list, errors, and medicine data to update
    const [medicines, setMedicines] = useState([]);
    const [medicine, setMedicine] = useState({
        name: '',
        manufacturer: '',
        price: '',
        quantity: '',
        expiryDate: '',
        gst: '',
        discount: ''
    });
    const [error, setError] = useState('');

    // Fetch all medicines on component load
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
                setError('Failed to fetch medicines. Please try again.');
                console.error(err);
            }
        };
        fetchMedicines();
    }, []);

    
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/medicines/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
                },
            });
            setMedicines(medicines.filter((med) => med.id !== id));
        } catch (err) {
            setError('Failed to delete medicine. Please try again.');
            console.error('Delete error:', err);
        }
    };

    const handleUpdateClick = async (id) => {
        setShowUpdateForm(true);
        try {
            const response = await axios.get(`http://localhost:8080/api/medicines/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
                },
            });
            setSelectedMedicine(id);
            setMedicine({
                ...response.data,
                gst: '',
                discount: '',
            }); 
        } catch (err) {
            setError('Failed to load medicine data for update.');
            console.error(err);
        }
    };

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setMedicine((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    
    const calculateFinalPrice = (price, gst, discount) => {
        let finalPrice = parseFloat(price);
        if (gst) {
            finalPrice += finalPrice * (parseFloat(gst) / 100);
        }
        if (discount) {
            finalPrice -= finalPrice * (parseFloat(discount) / 100);
        }
        return finalPrice.toFixed(2); 
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            const updatedMedicine = {
                ...medicine,
                price: calculateFinalPrice(medicine.price, medicine.gst, medicine.discount),
            };
            await axios.put(`http://localhost:8080/api/medicines/${selectedMedicine}`, updatedMedicine, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
                },
            });
            // Refresh the medicines list after update
            setMedicines(medicines.map((med) =>
                med.id === selectedMedicine ? updatedMedicine : med
            ));
            setShowUpdateForm(false); // Hide the form after successful update
        } catch (err) {
            setError('Failed to update medicine. Please try again.');
            console.error(err);
        }
    };

    return (
        <div>
            <h2>Medicine Management</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {showUpdateForm ? (
                
                <div>
                    <h3>Update Medicine</h3>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            value={medicine.name}
                            onChange={handleChange}
                            placeholder="Medicine Name"
                        />
                        <input
                            type="text"
                            name="manufacturer"
                            value={medicine.manufacturer}
                            onChange={handleChange}
                            placeholder="Manufacturer"
                        />
                        <input
                            type="number"
                            name="price"
                            value={medicine.price}
                            onChange={handleChange}
                            placeholder="Price"
                        />
                        <input
                            type="number"
                            name="gst"
                            value={medicine.gst}
                            onChange={handleChange}
                            placeholder="GST (%)"
                        />
                        <input
                            type="number"
                            name="discount"
                            value={medicine.discount}
                            onChange={handleChange}
                            placeholder="Discount (%)"
                        />
                        <input
                            type="number"
                            name="quantity"
                            value={medicine.quantity}
                            onChange={handleChange}
                            placeholder="Quantity"
                        />
                        <input
                            type="date"
                            name="expiryDate"
                            value={medicine.expiryDate}
                            onChange={handleChange}
                        />
                        <p>Final Price: ₹{calculateFinalPrice(medicine.price, medicine.gst, medicine.discount)}</p>
                        <button type="submit">Update</button>
                        <button onClick={() => setShowUpdateForm(false)}>Cancel</button>
                    </form>
                </div>
            ) : (
                
                <div>
                    <h3>Medicine List</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Manufacturer</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Expiry Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {medicines.map((med) => (
                                <tr key={med.id}>
                                    <td>{med.name}</td>
                                    <td>{med.manufacturer}</td>
                                    <td>{med.price}</td>
                                    <td>{med.quantity}</td>
                                    <td>{med.expiryDate}</td>
                                    <td>
                                        <button onClick={() => handleUpdateClick(med.id)}>Update</button>
                                        <button onClick={() => handleDelete(med.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UpdateMedicine;
