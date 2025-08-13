export interface DecodedToken {
  sub: string;
  email: string;
  jti: string;
  UserGuid: string;
  iss: string;
  aud: string;
  exp: number;
  iat: number;
}

export const decodeToken = (token: string): DecodedToken | null => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const isTokenExpired = (token: string): boolean => {
  const decoded = decodeToken(token);
  if (!decoded) return true;

  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.exp < currentTime;
};

export const getTokenExpirationTime = (token: string): Date | null => {
  const decoded = decodeToken(token);
  if (!decoded) return null;

  return new Date(decoded.exp * 1000);
};

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('jwtToken');
  if (!token) return false;
  
  return !isTokenExpired(token);
};

export const logout = (): void => {
  localStorage.removeItem('jwtToken');
  // Vous pouvez ajouter d'autres actions de nettoyage ici si nécessaire
};
