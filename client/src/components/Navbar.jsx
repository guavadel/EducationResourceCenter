import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { AuthContext } from './contexts/AuthContext';
import axios from 'axios';

const Navbar = () => {
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('Users'));
    if (storedUser) {
      setUserId(storedUser._id);
      setUserRole(storedUser.role);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get('/logout', { withCredentials: true });
      localStorage.removeItem('Users');navigate('/home');
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

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-gray-800 p-4 shadow-xl">
      <div className="container mx-auto flex items-center justify-between">
        <NavLink className="text-white text-xl font-bold hover:animate-pulse" to="/home">Education Resource Center</NavLink>
        <button
          className="text-white md:hidden ml-2"
          aria-label="Toggle navigation"
          onClick={toggleMenu}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        <div
          className={`hidden md:flex md:items-center md:justify-center space-x-5 ${isMenuOpen ? 'block' : 'hidden'}`}
        >
          <ul className="flex space-x-4">
            {userRole === 'student' && (
              <>
                <li>
                  <NavLink to="/student" className={({ isActive }) => `text-white transition-colors duration-300 ease-in-out px-3 py-2 rounded ${isActive ? 'bg-gray-700' : ''}`} end>
                    Student Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/student/resources" className={({ isActive }) => `text-white transition-colors duration-300 ease-in-out px-3 py-2 rounded ${isActive ? 'bg-gray-700' : ''}`} end>
                    Resources
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`/student/profile/${userId}`} className={({ isActive }) => `text-white transition-colors duration-300 ease-in-out px-3 py-2 rounded ${isActive ? 'bg-gray-700' : ''}`} end>
                    Profile Page
                  </NavLink>
                </li>
              </>
            )}
            {userRole === 'educator' && (
              <>
                <li>
                  <NavLink to="/educator" className={({ isActive }) => `text-white transition-colors duration-300 ease-in-out px-3 py-2 rounded ${isActive ? 'bg-gray-700' : ''}`} end>
                    Educator Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/educator/resources" className={({ isActive }) => `text-white transition-colors duration-300 ease-in-out px-3 py-2 rounded ${isActive ? 'bg-gray-700' : ''}`} end>
                    Resources
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`/educator/profile/${userId}`} className={({ isActive }) => `text-white transition-colors duration-300 ease-in-out px-3 py-2 rounded ${isActive ? 'bg-gray-700' : ''}`} end>
                    Profile Page
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`/educator/resources/${userId}/new`} className={({ isActive }) => `text-white transition-colors duration-300 ease-in-out px-3 py-2 rounded ${isActive ? 'bg-gray-700' : ''}`} end>
                    Upload New
                  </NavLink>
                </li>
              </>
            )}
            {user ? (
              <li>
                {/* <button className="text-white transition-colors duration-300 ease-in-out hover:bg-gray-700 px-3 py-2 rounded" onClick={handleLogout}>Logout</button> */}
              </li>
            ) : (
              <>
                <li>
                  <NavLink to="/login" className={({ isActive }) => `text-white transition-colors duration-300 ease-in-out px-3 py-2 rounded ${isActive ? 'bg-gray-700' : ''}`} end>
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/register" className={({ isActive }) => `text-white transition-colors duration-300 ease-in-out px-3 py-2 rounded ${isActive ? 'bg-gray-700' : ''}`} end>
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
          <ul className="flex flex-col space-y-2">
            {userRole === 'student' && (
              <>
                <li>
                  <NavLink to="/student" className={({ isActive }) => `text-white transition-colors duration-300 ease-in-out px-3 py-2 rounded ${isActive ? 'bg-gray-700' : ''}`} end>
                    Student Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/student/resources" className={({ isActive }) => `text-white transition-colors duration-300 ease-in-out px-3 py-2 rounded ${isActive ? 'bg-gray-700' : ''}`} end>
                    Resources
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`/student/profile/${userId}`} className={({ isActive }) => `text-white transition-colors duration-300 ease-in-out px-3 py-2 rounded ${isActive ? 'bg-gray-700' : ''}`} end>
                    Profile Page
                  </NavLink>
                </li>
              </>
            )}
            {userRole === 'educator' && (
              <>
                <li>
                  <NavLink to="/educator" className={({ isActive }) => `text-white transition-colors duration-300 ease-in-out px-3 py-2 rounded ${isActive ? 'bg-gray-700' : ''}`} end>
                    Educator Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/educator/resources" className={({ isActive }) => `text-white transition-colors duration-300 ease-in-out px-3 py-2 rounded ${isActive ? 'bg-gray-700' : ''}`} end>
                    Resources
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`/educator/profile/${userId}`} className={({ isActive }) => `text-white transition-colors duration-300 ease-in-out px-3 py-2 rounded ${isActive ? 'bg-gray-700' : ''}`} end>
                    Profile Page
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`/educator/resources/${userId}/new`} className={({ isActive }) => `text-white transition-colors duration-300 ease-in-out px-3 py-2 rounded ${isActive ? 'bg-gray-700' : ''}`} end>
                    Upload New
                  </NavLink>
                </li>
              </>
            )}
            {user ? (
              <li>
                {/* <button className="text-white transition-colors duration-300 ease-in-out hover:bg-gray-700 px-3 py-2 rounded" onClick={handleLogout}>Logout</button> */}
              </li>
            ) : (
              <>
                <li>
                  <NavLink to="/login" className={({ isActive }) => `text-white transition-colors duration-300 ease-in-out px-3 py-2 rounded ${isActive ? 'bg-gray-700' : ''}`} end>
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/register" className={({ isActive }) => `text-white transition-colors duration-300 ease-in-out px-3 py-2 rounded ${isActive ? 'bg-gray-700' : ''}`} end>
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
