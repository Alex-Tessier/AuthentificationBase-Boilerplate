import axios from 'axios';
import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig  } from 'axios';
import { isTokenExpired, logout } from '../utils/tokenUtils';

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use(
    (config: CustomAxiosRequestConfig) => {
      const token = localStorage.getItem('jwtToken');
      
      if (token) {
        // Vérifier si le token est expiré avant de l'envoyer
        if (isTokenExpired(token)) {
          logout();
          window.location.href = '/login';
          return Promise.reject(new Error('Token expired'));
        }
        
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        logout();
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export const axiosInstance = createAxiosInstance();