import React, { ReactNode }  from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../services/auth.service';

interface PrivateRouteProps {

    children: ReactNode;
  
  }
  const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {

  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
  
};

export default PrivateRoute;

