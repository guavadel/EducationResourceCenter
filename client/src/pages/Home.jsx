import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Home = () => {
  const [userRole, setUserRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in by looking for a user object in local storage
    const user = JSON.parse(localStorage.getItem('Users'));
    if (user) {
      setIsLoggedIn(true);
      setUserRole(user.role); // Assuming the user object has a role property
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn && !localStorage.getItem('toastShown')) {
      // Show a toast message for logged-in users
      toast.success(`Welcome back, ${userRole}!`, {
        position: 'top-center',
        duration: 3000,
      });

      // Set a flag in localStorage to indicate the toast has been shown
      localStorage.setItem('toastShown', 'true');

      // Redirect to the user's home page
      setTimeout(() => {
        if (userRole === 'student') {
          navigate('/student');
        } else if (userRole === 'educator') {
          navigate('/educator');
        }
      }, 3000);
    }
  }, [isLoggedIn, userRole, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950">
      <div className="text-center p-6">
        <h2 className="text-4xl font-bold mb-4 text-gray-300">Welcome to the Education Resource Center</h2>
        <p className="text-lg mb-8 text-gray-200">Your gateway to educational resources and more!</p>
        {!isLoggedIn ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-700 p-8 rounded-lg shadow-md">
              <h5 className="text-2xl font-semibold mb-2 text-gray-300">Educator</h5>
              <p className="text-gray-400 mb-4">Login as an educator to manage resources and profiles.</p>
              <Link to="/educator/login" className="bg-slate-950 hover:bg-slate-200 hover:text-black text-gray-300 font-semibold py-2 px-4 rounded transition-colors duration-300 ease-in-out">Login as Educator</Link>
            </div>
            <div className="bg-slate-700 p-8 rounded-lg shadow-md">
              <h5 className="text-2xl font-semibold mb-2 text-gray-300">Student</h5>
              <p className="text-gray-400 mb-4">Login as a student to access resources and profiles.</p>
              <Link to="/student/login" className="bg-slate-950 hover:bg-slate-200 hover:text-black text-gray-300 font-semibold py-2 px-4 rounded transition-colors duration-300 ease-in-out">Login as Student</Link>
            </div>
          </div>
        ) : (
          <p className="text-lg mb-8 text-gray-200">Hello {userRole}.</p>
        )}
        {!isLoggedIn && (
          <p className="text-gray-300 mt-4">
            Don't have an account?<br />
            Register here - as a <Link to="/student/register" className="text-slate-300 hover:text-gray-200 transition-colors duration-200 ease-in-out">student</Link> or <Link to="/educator/register" className="text-slate-300 hover:text-gray-200 transition-colors duration-200 ease-in-out">educator</Link>.
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
