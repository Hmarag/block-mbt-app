import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { JSX } from 'react';

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { token } = useAuth();

  if (!token) {
    // Αν δεν υπάρχει token, κάνουμε redirect στο login
    return <Navigate to="/login" replace />;
  }

  // Αν υπάρχει token, εμφανίζουμε το protected component
  return children;
}