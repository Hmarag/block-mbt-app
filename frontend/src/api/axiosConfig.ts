// ...existing code...
import axios from 'axios';

const isProduction = import.meta.env.PROD;
const envUrl = import.meta.env.VITE_API_URL as string | undefined;

const DEFAULT_BACKEND = envUrl ?? (isProduction
  ? 'https://block-mbt-backend.onrender.com'
  : 'http://localhost:8000');

const instance = axios.create({ baseURL: DEFAULT_BACKEND });

instance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('authToken');
    if (token) {
      // ασφαλής ανάθεση headers ώστε να μην σπάσει ο τύπος
      config.headers = { ...(config.headers ?? {}), Authorization: `Bearer ${token}` };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
// ...existing code...