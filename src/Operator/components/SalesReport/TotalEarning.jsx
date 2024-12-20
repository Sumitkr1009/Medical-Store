import React, { useEffect, useState } from 'react';
import ApiService from '../../../Config/ApiServices';
import 'C:/Users/sumit/OneDrive/Desktop/MedicalStore/medicalshop/src/Styles/TotalEarning.css'


export default function TotalEarning() {
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchTotalEarnings = async () => {
            try {
                const response = await ApiService.getTotalEarnings();
                setTotal(response.data.total);
            } catch (error) {
                console.error('Failed to fetch total earnings:', error);
            }
        };

        fetchTotalEarnings();
    }, []);

    return <h2>Total Earnings: {total}</h2>;
}
