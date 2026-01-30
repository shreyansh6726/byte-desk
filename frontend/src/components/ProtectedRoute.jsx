import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('user');

  if (!user) {
    // If no user is found, redirect them to the login page
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;