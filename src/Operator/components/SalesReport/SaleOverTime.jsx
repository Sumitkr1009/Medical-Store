// src/Operator/components/SaleReport/SaleOverTime.jsx
import React, { useEffect, useState } from 'react';
import ApiService from '../../../Config/ApiServices';
import 'C:/Users/sumit/OneDrive/Desktop/MedicalStore/medicalshop/src/Styles/SalesOverTime.css'


export default function SaleOverTime() {
    const [sales, setSales] = useState([]);

    useEffect(() => {
        const fetchSales = async () => {
            try {
                const response = await ApiService.getSalesOverTime();
                setSales(response.data);
            } catch (error) {
                console.error('Failed to fetch sales:', error);
            }
        };

        fetchSales();
    }, []);

    return (
        <div>
            <h2>Sales Over Time</h2>
            <ul>
                {sales.map((sale) => (
                    <li key={sale.id}>
                        {sale.date} - {sale.totalAmount}
                    </li>
                ))}
            </ul>
        </div>
    );
}
