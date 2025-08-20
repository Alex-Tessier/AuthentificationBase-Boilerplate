import axios from 'axios';
import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig  } from 'axios';
import { getStoredTokens, saveTokens, clearTokens } from '../utils/tokenUtils';

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const handleAuthFailure = () => {
  clearTokens();
  
  if (window.location.pathname === '/login') {
    return;
  }

  window.location.href = '/login';
};

const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use(
    async (config: CustomAxiosRequestConfig) => {
      const tokens = getStoredTokens();
      
      if (tokens.accessToken && !config.url?.includes('/auth/login')) {
        config.headers.Authorization = `Bearer ${tokens.accessToken}`;
      }
      
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as CustomAxiosRequestConfig;
      
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        
        const tokens = getStoredTokens();
        
        if (tokens.refreshToken) {
          try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh-token`, { refreshToken: tokens.refreshToken });
            saveTokens(response.data);
            
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
            }
            return instance(originalRequest);
            
          } catch (refreshError) {

            handleAuthFailure();
            return Promise.reject(new Error('Session expired please login again.'));
          }
        } else {

          handleAuthFailure();
          return Promise.reject(new Error('Session expired please login again.'));
        }
      }
      
      return Promise.reject(error);
    }
  );

  return instance;
};

export const axiosInstance = createAxiosInstance();