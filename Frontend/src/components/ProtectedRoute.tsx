import { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {

  const isAuthenticated = () => {
    const token = localStorage.getItem('jwtToken');
    return token !== null && token !== undefined;
  };

  // Si l'utilisateur n'est pas connecté, redirige vers login
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  // Si l'utilisateur est connecté, affiche le composant
  return <>{children}</>;
};

export default ProtectedRoute;
