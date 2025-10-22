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
      if (!config.headers) config.headers = {};
      // cast σε απλό record για να αποφύγουμε τύπο AxiosHeaders
      (config.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
// ...existing code...