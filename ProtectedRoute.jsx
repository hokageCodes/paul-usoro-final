/* eslint-disable react/prop-types */
import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth, onAuthStateChanged } from './firebase'; // Ensure this import is correct

const ProtectedRoute = ({ redirectTo = "/admin-login" }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Set authenticated user or null
      setLoading(false); // Stop loading once status is checked
    });

    return () => unsubscribe(); // Clean up on unmount to avoid memory leaks
  }, []);

  if (loading) return <div>Loading...</div>; // Loading state while checking auth
  return user ? <Outlet /> : <Navigate to={redirectTo} />; // Redirect if not logged in
};

export default ProtectedRoute;
