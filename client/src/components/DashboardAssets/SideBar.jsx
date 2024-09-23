import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaTachometerAlt, FaUserCircle, FaBook, FaBullhorn, FaHandsHelping, FaCog, FaSignOutAlt } from 'react-icons/fa';

const DashboardSidebar = () => {
  const [userId, setUserId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('Users'));
    if (storedUser) {
      setUserId(storedUser._id); // Assuming the user object contains an _id field
      setIsLoggedIn(true);
      setUserRole(storedUser.role); // Assuming the user object contains a role field
    }
  }, []);

  const handleLogout = async () => {
    try {
      // Call the API to log out
      await axios.get('/logout', { withCredentials: true });

      // Clear user data from local storage
      localStorage.removeItem('Users');
      setIsLoggedIn(false);
      setUserRole(null);
      setUserId(null);

      // Show a success toast message
      navigate('/home');
      
      navigate(0)

      toast.success('Logged out successfully!', {
        position: 'top-center',
        duration: 3000,
      });
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Could not log out. Please try again.', {
        position: 'top-center',
        duration: 3000,
      });
    }
  };

  const links = [
    { name: "Home", path: "/home", icon: <FaHome /> },
    { name: "Dashboard", path: "/educator/dashboard", icon: <FaTachometerAlt /> },
    { name: "Profile", path: `/educator/profile/${userId}`, icon: <FaUserCircle /> },
    { name: "All Resources", path: "/educator/resources", icon: <FaBook /> },
    { name: "Announcements", path: "/announcements", icon: <FaBullhorn /> },
    { name: "Support", path: "/support", icon: <FaHandsHelping /> },
    { name: "Settings", path: "/settings", icon: <FaCog /> },
  ];

  return (
    <div className="text-black flex flex-col min-h-screen px-4 py-6 space-y-4 bg-gradient-to-br from-slate-900 to-slate-700 drop-shadow-xl shadow-dark-gray-bottom-right">
      <div className="space-y-2">
        <ul className="space-y-8">
          {links.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) => `flex text-gray-400 justify-start items-center p-3 rounded hover:bg-gray-100 hover:text-slate-800 transition duration-300 ease-in-out ${isActive ? 'text-white bg-gray-600' : ''}`}
              >
                <span className="mr-3 text-xl">{link.icon}</span>
                {link.name}
              </NavLink>
            </li>
          ))}
          <li>
            <button
              onClick={handleLogout}
              className="z-50 flex text-gray-400 justify-start items-center p-3 rounded hover:bg-gray-100 hover:text-slate-800 transition duration-300 ease-in-out w-full"
            >
              <span className="mr-3 text-xl"><FaSignOutAlt /></span>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardSidebar;
