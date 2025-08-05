// src/api/userApi.ts
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

export interface AuthentificationDto {
  userNameOrEmail: string;
  password: string;
}

export const loginUser = (data: AuthentificationDto) =>
    axios.post(`${API_URL}/auth/login`, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  });