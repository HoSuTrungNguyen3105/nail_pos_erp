import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface RequireAuthProps {
  allowedRoles?: string[];
}

export const RequireAuth = ({ allowedRoles }: RequireAuthProps) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="w-8 h-8 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard if unauthorized for this route
    const redirectPath = user.role === 'provider' || user.role === 'admin' 
      ? '/provider/dashboard' 
      : '/distributor/marketplace';
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};
