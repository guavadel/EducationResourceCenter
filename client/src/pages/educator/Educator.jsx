import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUserCircle, FaBook, FaBullhorn, FaCog } from 'react-icons/fa';

const Educator = () => {
  const user = JSON.parse(localStorage.getItem('Users'));
  const userId = user ? user._id : null;

  // Check userId and role for debugging
  console.log("User ID:", userId);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-700">
      <h1 className="text-3xl font-bold mb-5 text-slate-300">Welcome, Educator!</h1>
      <p className="text-lg mb-8 text-slate-200 text-center">
        Manage your profile, resources, announcements, and settings from the links below. Each section provides essential tools and information to support your role effectively.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <NavLink 
          to={`/educator/profile/${userId}`} 
          className="p-4 bg-gradient-to-r from-slate-800 via-slate-900 to-slate-950 text-slate-300 rounded-lg flex items-center space-x-3 transition-transform duration-300 transform hover:scale-105 hover:shadow-lg"
        >
          <FaUserCircle size={30} />
          <div>
            <span className="font-semibold">Profile</span>
            <p className="text-sm">Update your personal information and view your profile details.</p>
          </div>
        </NavLink>
        <NavLink 
          to="/educator/resources" 
          className="p-4 bg-gradient-to-r from-slate-800 via-slate-900 to-slate-950 text-slate-300 rounded-lg flex items-center space-x-3 transition-transform duration-300 transform hover:scale-105 hover:shadow-lg"
        >
          <FaBook size={30} />
          <div>
            <span className="font-semibold">Your Resources</span>
            <p className="text-sm">Manage and view the educational resources you have uploaded or created.</p>
          </div>
        </NavLink>
        <NavLink 
          to="/educator/announcements" 
          className="p-4 bg-gradient-to-r from-slate-800 via-slate-900 to-slate-950 text-slate-300 rounded-lg flex items-center space-x-3 transition-transform duration-300 transform hover:scale-105 hover:shadow-lg"
        >
          <FaBullhorn size={30} />
          <div>
            <span className="font-semibold">Announcements</span>
            <p className="text-sm">Post and view important announcements for your students and colleagues.</p>
          </div>
        </NavLink>
        <NavLink 
          to="/educator/settings" 
          className="p-4 bg-gradient-to-r from-slate-800 via-slate-900 to-slate-950 text-slate-300 rounded-lg flex items-center space-x-3 transition-transform duration-300 transform hover:scale-105 hover:shadow-lg"
        >
          <FaCog size={30} />
          <div>
            <span className="font-semibold">Settings</span>
            <p className="text-sm">Customize your account preferences and application settings.</p>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Educator;
