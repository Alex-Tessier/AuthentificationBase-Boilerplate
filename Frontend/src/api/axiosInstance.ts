import axios from 'axios';
import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig  } from 'axios';
import { isTokenExpired, logout, getStoredTokens, saveTokens } from '../utils/tokenUtils';
import { refreshToken as refreshTokenAPI } from '../services/authService';

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
    async (config: CustomAxiosRequestConfig) => {
      const tokens = getStoredTokens();
      
      if (tokens.accessToken) {
        if (isTokenExpired(tokens.accessToken)) {
          if (tokens.refreshToken && !config._retry) {
            try {
              config._retry = true;
              const response = await refreshTokenAPI({ refreshToken: tokens.refreshToken });
              saveTokens(response.data);
              config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            } catch (error) {
              logout();
              if (window.location.pathname !== '/login') {
                window.location.href = '/login';
              }
              return Promise.reject(new Error('Token refresh failed'));
            }
          } else {
            logout();
            if (window.location.pathname !== '/login') {
              window.location.href = '/login';
            }
            return Promise.reject(new Error('Token expired'));
          }
        } else {
          config.headers.Authorization = `Bearer ${tokens.accessToken}`;
        }
      }
      
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  // Intercepteur de réponse pour gérer les erreurs 401
  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as CustomAxiosRequestConfig;
      
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        
        const tokens = getStoredTokens();
        if (tokens.refreshToken) {
          try {
            const response = await refreshTokenAPI({ refreshToken: tokens.refreshToken });
            saveTokens(response.data);
            
            // Retry the original request with the new token
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
            }
            return instance(originalRequest);
          } catch (refreshError) {
            logout();
            if (window.location.pathname !== '/login') {
              window.location.href = '/login';
            }
          }
        } else {
          logout();
          if (window.location.pathname !== '/login') {
            window.location.href = '/login';
          }
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export const axiosInstance = createAxiosInstance();