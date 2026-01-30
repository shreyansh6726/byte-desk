import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Must match the storage used in Login/Signup
  const user = sessionStorage.getItem('user');
  const location = useLocation();

  if (!user) {
    // If user is null, it redirects back to login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;