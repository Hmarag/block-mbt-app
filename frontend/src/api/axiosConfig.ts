import axios from 'axios';

// Όταν είμαστε σε "live" περιβάλλον (Vercel/Render), το baseURL είναι η πλήρης διεύθυνση του backend.
// Όταν είμαστε τοπικά, είναι το κλασικό localhost.
const isProduction = import.meta.env.PROD;

const instance = axios.create({
  baseURL: isProduction 
    ? 'https://block-mbt-backend.onrender.com' // Η διεύθυνση που θα έχει το backend μας στο Render
    : 'http://localhost:8000',
});

// Ο interceptor για το token παραμένει ο ίδιος
instance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('authToken'); // Χρησιμοποιούμε sessionStorage όπως στο AuthContext
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;