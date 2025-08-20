import { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/tokenUtils';
import { useApp } from './AppContext';
import AuthenticatedLayout from './AuthenticatedLayout';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLoading } = useApp();


  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen w-screen bg-white flex items-center justify-center">
        <div className="text-xl">Loading</div>
      </div>
    );
  }

  return (
    <AuthenticatedLayout>
      {children}
    </AuthenticatedLayout>
  );
};

export default ProtectedRoute;
