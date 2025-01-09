import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const api = axios.create({
    baseURL: 'http://localhost:4001/api/v1',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Helper function to get user data from token
export const getUserFromToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const decoded = jwtDecode(token);
            return decoded;
        } catch (error) {
            console.error('Error decoding token:', error);
            localStorage.removeItem('token'); // Remove invalid token
            return null;
        }
    }
    return null;
};

// Add request interceptor for token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            console.error('API Error Response:', error.response.data);
            
            // Handle token expiration
            if (error.response.status === 401) {
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Request setup error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default api;