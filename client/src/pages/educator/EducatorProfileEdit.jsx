import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import DashboardSidebar from '../../components/DashboardAssets/SideBar';

axios.defaults.withCredentials = true;

const EducatorProfileEdit = () => {
  const { userId } = useParams();
  const [initialData, setInitialData] = useState({
    name: '',
    email: '',
    username: '',
    collegeName: '',
    experience: '',
    role: 'educator',
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    collegeName: '',
    experience: '',
    role: 'educator',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEducatorProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/profile/educator/${userId}/edit`, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });

        if (res.data && res.data.educator) {
          const { name, email, username, collegeName, experience } = res.data.educator;
          setInitialData({ name, email, username, collegeName, experience, role: 'educator' });
          setFormData({ name, email, username, collegeName, experience, role: 'educator' });
        } else {
          setErrorMessage('Educator data not found.');
        }
      } catch (error) {
        console.error('Error fetching educator profile:', error);
        setErrorMessage('Failed to fetch educator profile. Please try again.');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    };

    if (userId) {
      fetchEducatorProfile();
    } else {
      setErrorMessage('Invalid user ID.');
    }
  }, [userId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the form data has changed
    const isChanged = Object.keys(initialData).some(key => formData[key] !== initialData[key]);
    if (!isChanged) {
      toast('No changes made.', {
        icon: '🐦‍⬛'
      });
      navigate(`/educator/profile/${userId}`);

      return;
    }

    try {
      const res = await axios.put(`http://localhost:3000/profile/educator/${userId}/edit`, formData, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });

      if (res.data.message === 'Profile updated successfully') {
        toast.success('Profile updated!');
        navigate(`/educator/profile/${userId}`);
      } else {
        toast('No changes made.', {
          icon: '🐦‍⬛'
        });
        console.log("zzzzzzzzzzzzz", res.data);
        navigate(`/educator/profile/${userId}`);
      }
    } catch (error) {
      console.error('Error updating profile:', error.response?.data || error.message);
      setErrorMessage('Failed to update profile. Please check your inputs.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="bg-slate-900 h-full w-full flex flex-row gap-x-7 px-0 py-0">
      <div className="w-1/6 min-h-screen bg-yellow">
        {/* Sidebar */}
        <DashboardSidebar />
      </div>
      <div className="w-3/6 h-screen flex flex-col gap-6 p-10 bg-transparent rounded-lg shadow-lg shadow-white">
        <h2 className="text-5xl font-semibold mb-4 text-gray-600">Edit Profile Details</h2>
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-200 text-red-800 border border-red-300 rounded">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} className="p-10 shadow-lg bg-gradient-to-br from-slate-900 from-60% to-slate-800 rounded-xl">
          <div className="mb-6 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <label htmlFor="name" className="text-gray-500 font-medium text-2xl w-40">Name:</label>
              <input
                type="text"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-300"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex items-center gap-4 my-1">
              <label htmlFor="email" className="text-gray-500 font-medium text-2xl w-40">Email:</label>
              <input
                type="email"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-300"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex items-center gap-4 my-1">
              <label htmlFor="username" className="text-gray-500 font-medium text-2xl w-40">Username:</label>
              <input
                type="text"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-300"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex items-center gap-4 my-1">
              <label htmlFor="collegeName" className="text-gray-500 font-medium text-2xl w-40">College Name:</label>
              <input
                type="text"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-300"
                id="collegeName"
                name="collegeName"
                value={formData.collegeName}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center gap-4 my-1">
              <label htmlFor="experience" className="text-gray-500 font-medium text-2xl w-40">Experience:</label>
              <input
                type="text"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-300"
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-slate-950 text-gray-400 justify-start items-center p-3 rounded hover:bg-gray-300 hover:text-slate-800 transition duration-300 ease-in-out decoration-transparent border-none"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default EducatorProfileEdit;
