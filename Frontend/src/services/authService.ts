import { axiosInstance } from "api/axiosInstance";
import type { LoginResponse, RefreshTokenRequest } from "../types/auth";

export interface AuthentificationDto {
  userNameOrEmail: string;
  password: string;
}

export const loginUser = (data: AuthentificationDto) =>
    axiosInstance.post<LoginResponse>('/auth/login', data);

export const refreshToken = (data: RefreshTokenRequest) =>
    axiosInstance.post<LoginResponse>('/auth/refreshtoken', data);

export const logoutUser = (data: RefreshTokenRequest) =>
    axiosInstance.post<string>('/auth/logout', data);
