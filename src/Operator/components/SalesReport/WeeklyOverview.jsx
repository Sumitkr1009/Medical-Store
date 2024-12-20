// src/Operator/components/SaleReport/WeeklyOverview.jsx
import React, { useEffect, useState } from 'react';
import ApiService from '../../../Config/ApiServices';
import 'C:/Users/sumit/OneDrive/Desktop/MedicalStore/medicalshop/src/Styles/WeeklyOverview.css'


export default function WeeklyOverview() {
    const [overview, setOverview] = useState([]);

    useEffect(() => {
        const fetchWeeklyOverview = async () => {
            try {
                const response = await ApiService.getWeeklyOverview();
                setOverview(response.data);
            } catch (error) {
                console.error('Failed to fetch weekly overview:', error);
            }
        };

        fetchWeeklyOverview();
    }, []);

    return (
        <div>
            <h2>Weekly Overview</h2>
            <ul>
                {overview.map((week, index) => (
                    <li key={index}>
                        Week {week.week}: {week.totalSales}
                    </li>
                ))}
            </ul>
        </div>
    );
}
