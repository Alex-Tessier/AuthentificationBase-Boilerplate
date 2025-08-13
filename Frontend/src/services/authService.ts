import { axiosInstance } from "api/axiosInstance";

export interface AuthentificationDto {
  userNameOrEmail: string;
  password: string;
}

export const loginUser = (data: AuthentificationDto) =>
    axiosInstance.post('/auth/login', data);
