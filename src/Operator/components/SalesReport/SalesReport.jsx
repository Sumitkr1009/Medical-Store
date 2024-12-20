import React, { useEffect, useState } from "react";
import axios from "axios";
import "C:/Users/sumit/OneDrive/Desktop/MedicalStore/medicalshop/src/Styles/SalesReport.css";

const SalesReport = () => {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/sales", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        });
        console.log("Sales Data Response:", response.data);
        setSalesData(response.data);
      } catch (error) {
        console.error("Error fetching sales data:", error);
        setError("Failed to fetch sales data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchSalesData();
  }, []);
  
  if (loading) {
    return <div className="loading">Loading Sales Report...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="sales-report-container">
      <h2 className="sales-report-title">Sales Report</h2>
      {salesData.length === 0 ? (
        <p>No sales data available.</p>
      ) : (
        <table className="sales-report-table">
          <thead>
            <tr>
              <th>Sale ID</th>
              <th>Total</th>
              <th>GST</th>
              <th>Final Price</th>
              <th>Sale Date</th>
              <th>Items Sold</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((sale) => (
              <tr key={sale.id}>
                <td>{sale.id}</td>
                <td>₹ {sale.total ? sale.total.toFixed(2) : "0.00"}</td>
                <td>₹ {sale.gst ? sale.gst.toFixed(2) : "0.00"}</td>
                <td>₹ {sale.finalPrice ? sale.finalPrice.toFixed(2) : "0.00"}</td>
                <td>{sale.saleDate || "N/A"}</td>
                <td>
                  {sale.saleItems.map((item) => (
                    <div key={item.id}>
                      {item.name} (Qty: {item.quantity})
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SalesReport;
