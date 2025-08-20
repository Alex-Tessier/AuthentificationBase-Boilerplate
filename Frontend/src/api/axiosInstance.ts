import axios from 'axios';
import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig  } from 'axios';
import { getStoredTokens, saveTokens, clearTokens } from '../utils/tokenUtils';
import { refreshToken as refreshTokenAPI } from '../services/authService';

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const handleAuthFailure = (errorMessage: string = 'Session expirée, veuillez vous reconnecter') => {
  clearTokens();
  
  if (window.location.pathname === '/login') {
    const event = new CustomEvent('authError', { 
      detail: { message: errorMessage } 
    });
    window.dispatchEvent(event);
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
        
        const isAuthRequest = originalRequest.url?.includes('/auth/');
        if (isAuthRequest) {
          return Promise.reject(error);
        }
        
        const tokens = getStoredTokens();
        
        if (tokens.refreshToken) {
          try {
            const response = await refreshTokenAPI({ refreshToken: tokens.refreshToken });
            saveTokens(response.data);
            
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
            }
            return instance(originalRequest);
            
          } catch (refreshError) {
            handleAuthFailure('Session expired please login again.');
            return Promise.reject(new Error('Session expired please login again.'));
          }
        } else {
          handleAuthFailure('Session expired please login again.');
          return Promise.reject(new Error('Session expired please login again.'));
        }
      }
      
      return Promise.reject(error);
    }
  );

  return instance;
};

export const axiosInstance = createAxiosInstance();