import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_HOST,
});

api.interceptors.request.use(
  (config) => {
    if (!config.url.includes('/login') && !config.url.includes('/register')) {
      const token = localStorage.getItem('token'); 

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
