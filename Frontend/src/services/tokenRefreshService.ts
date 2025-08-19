import { refreshToken as refreshTokenAPI } from '../services/authService';
import { getStoredTokens, saveTokens, logout } from '../utils/tokenUtils';

export const refreshAccessToken = async (): Promise<boolean> => {
  const tokens = getStoredTokens();
  
  if (!tokens.refreshToken) {
    return false;
  }

  try {
    const response = await refreshTokenAPI({ refreshToken: tokens.refreshToken });
    saveTokens(response.data);
    return true;
  } catch (error) {
    console.error('Failed to refresh token:', error);
    logout();
    return false;
  }
};

export const scheduleTokenRefresh = () => {
  // Refresh token 5 minutes before expiration
  const tokens = getStoredTokens();
  if (tokens.expiresAt) {
    const expirationTime = new Date(tokens.expiresAt).getTime();
    const currentTime = Date.now();
    const timeUntilRefresh = expirationTime - currentTime - (5 * 60 * 1000); // 5 minutes before

    if (timeUntilRefresh > 0) {
      setTimeout(async () => {
        const success = await refreshAccessToken();
        if (success) {
          scheduleTokenRefresh(); // Schedule next refresh
        }
      }, timeUntilRefresh);
    }
  }
};
