import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';

// AuthGuard Component to protect routes
const AuthGuard = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>; // Optional loading state
  }

  return isAuthenticated ? children : <Navigate to="/" />; // Redirect to home if not authenticated
};

export default AuthGuard;
