// src/Config/ApiService.js
import axios from 'axios';

const API_URL = 'http://localhost:8081/api'; // Adjust according to your backend

const ApiService = {
    getMedicines: () => axios.get(`${API_URL}/medicines`),
    deleteMedicine: (id) => axios.delete(`${API_URL}/medicines/${id}`),
    addMedicineToSale: (data) => axios.post(`${API_URL}/sales`, data),
    getSalesOverTime: () => axios.get(`${API_URL}/sales/overtime`),
    getTotalEarnings: () => axios.get(`${API_URL}/sales/total`),
    getWeeklyOverview: () => axios.get(`${API_URL}/sales/weekly`),
    login: (data) => axios.post(`${API_URL}/login`, data),
    register: (data) => axios.post(`${API_URL}/register`, data),
};

export default ApiService;
