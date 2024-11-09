import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = () => {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        navigate('/login'); // Redirect to login page if no authToken
      }
    };

    const handleActivity = () => {
      localStorage.setItem('authToken', 'your-auth-token'); // Reset token on activity
    };

    checkSession();

    // Set timeout for session expiration
    const timeout = setTimeout(() => {
      localStorage.removeItem('authToken'); // Remove token after inactivity
      navigate('/login'); // Redirect to login page
    }, 30 * 60 * 1000); // 30 minutes

    // Reset timeout on user activity
    window.addEventListener('click', handleActivity);
    window.addEventListener('keypress', handleActivity);
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('scroll', handleActivity);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('keypress', handleActivity);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('scroll', handleActivity);
    };
  }, [navigate]);

  return element;
};

export default ProtectedRoute;
