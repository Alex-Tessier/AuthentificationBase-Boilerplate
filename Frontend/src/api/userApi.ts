// src/api/userApi.ts
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

export interface RegisterUserDto {
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export const registerUser = (data: RegisterUserDto) =>
  axios.post(`${API_URL}/user/register`, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  });