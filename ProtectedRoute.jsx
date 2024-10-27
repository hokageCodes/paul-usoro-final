/* eslint-disable react/prop-types */
import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth, onAuthStateChanged } from './firebase';

const ProtectedRoute = ({ redirectTo = "/" }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;
  return user ? <Outlet /> : <Navigate to={redirectTo} />;
};

export default ProtectedRoute;
