// src/Operator/components/MedicineList/DeleteMedicine.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'C:/Users/sumit/OneDrive/Desktop/MedicalStore/medicalshop/src/Styles/DeleteMedicine.css'; // Adjust path if necessary

const DeleteMedicine = () => {
  const [medicineId, setMedicineId] = useState('');
  const [medicines, setMedicines] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching medicines from the backend (replace with real API call)
    const fetchedMedicines = [
      { id: 1, name: 'Paracetamol' },
      { id: 2, name: 'Aspirin' },
      { id: 3, name: 'Ibuprofen' },
    ];
    setMedicines(fetchedMedicines);
  }, []);

  const handleDelete = () => {
    if (!medicineId) {
      alert('Please select a medicine to delete.');
      return;
    }

    // Simulate delete logic (replace with actual API logic)
    const updatedMedicines = medicines.filter((med) => med.id !== parseInt(medicineId));
    setMedicines(updatedMedicines);

    alert('Medicine deleted successfully!');
    navigate('/');
  };

  return (
    <div className="delete-medicine-container">
      <div className="delete-medicine-card">
        <h2>Delete Medicine</h2>
        <p>Select a medicine to delete from the list below.</p>
        <select
          value={medicineId}
          onChange={(e) => setMedicineId(e.target.value)}
          className="medicine-select"
        >
          <option value="">Select Medicine</option>
          {medicines.map((med) => (
            <option key={med.id} value={med.id}>
              {med.name}
            </option>
          ))}
        </select>
        <button onClick={handleDelete} className="delete-button">
          Delete Medicine
        </button>
        <p className="redirect-text">
          Go back to <span onClick={() => navigate('/')} className="back-link">Home</span>
        </p>
      </div>
    </div>
  );
};

export default DeleteMedicine;
