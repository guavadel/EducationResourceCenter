import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ProtectedRoute = ({ user, role, children, loading }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return; // Prevent rendering or redirecting while loading

    // If the user is not logged in, allow access to login and register pages
    if (!user) {
      if (location.pathname === '/login' || location.pathname === '/register') {
        return;
      }

      // Redirect to login page if trying to access a protected route
      // toast('You are not logged in. Redirecting to login page.', {
      //   icon: '⚠️',
      //   style: { border: '1px solid red' },
      // });
      navigate('/login'); // Redirect to the login page
      return;
    }

    // Check for role-based access control
    if (role && user.role !== role) {
      // toast('You do not have permission to access this page.', {
      //   icon: '❌',
      //   style: { border: '1px solid red' },
      // });
      navigate('/home'); // Redirect to the home page or another page
      return;
    }

    // Redirect logged-in users away from login and register pages
    if (user && (location.pathname === '/login' || location.pathname === '/register')) {
      // toast('You are already logged in.', {
      //   icon: 'ℹ️',
      // });
      navigate('/home'); // Redirect to the home page or user-specific home page
      return;
    }
  }, [user, role, location, navigate]);

  if (loading) return <div>Loading...</div>; // Show a loading indicator while loading

  // Render children if all conditions are met
  return user && (role ? user.role === role : true) ? children : null;
};

export default ProtectedRoute;
