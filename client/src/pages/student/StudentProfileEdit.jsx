import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import DashboardSidebar from '../../components/DashboardAssets/SideBar';
import StudentSidebar from '../../components/DashboardAssets/StudentSidebar';

axios.defaults.withCredentials = true;

const StudentProfileEdit = () => {
  const { userId } = useParams();
  console.log('Updating profile for userId:', userId);

  const [initialData, setInitialData] = useState({
    name: '',
    email: '',
    username: '',
    collegeName: '',
    branch: '',
    year: '',
    role: 'student',
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    collegeName: '',
    branch: '',
    year: '',
    role: 'student',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentProfile = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:3000/profile/student/${userId}/edit`, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
  
        if (res.data && res.data.student) {
          const { name, email, username, collegeName, branch, year } = res.data.student;
          setInitialData({ name, email, username, collegeName, branch, year, role: 'student' });
          setFormData({ name, email, username, collegeName, branch, year, role: 'student' });
          console.log('Initial data set:', { name, email, username, collegeName, branch, year });
        } else {
          setErrorMessage('Student data not found.');
        }
      } catch (error) {
        console.error('Error fetching student profile:', error);
        setErrorMessage('Failed to fetch student profile. Please try again.');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } finally {
        setLoading(false);
      }
    };
  
    if (userId) {
      fetchStudentProfile();
    } else {
      setErrorMessage('Invalid user ID.');
    }
  }, [userId, navigate]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const updateUrl = `http://localhost:3000/profile/student/${userId}/edit`;
  
    try {
      const res = await axios.put(updateUrl, formData, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
  
      if (res.data.message === 'Profile updated successfully') {
        toast.success('Profile updated!');
      } else {
        toast('No changes made.', {
          icon: '🐦‍⬛'
        });
      }
      navigate(`/student/profile/${userId}`);
    } catch (error) {
      console.error('Error updating profile:', error.response?.data || error.message);
      setErrorMessage('Failed to update profile. Please check your inputs.');
    } finally {
      setLoading(false);
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
        <StudentSidebar />
      </div>
      <div className="w-3/6 h-screen flex flex-col gap-6 p-10 bg-transparent rounded-lg shadow-lg shadow-white">
        <h2 className="text-5xl font-semibold mb-4 text-gray-600">Edit Profile Details</h2>
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-200 text-red-800 border border-red-300 rounded">
            {errorMessage}
          </div>
        )}
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="loader">Loading...</div>
          </div>
        ) : (
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
                <label htmlFor="branch" className="text-gray-500 font-medium text-2xl w-40">Branch:</label>
                <input
                  type="text"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-300"
                  id="branch"
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center gap-4 my-1">
                <label htmlFor="year" className="text-gray-500 font-medium text-2xl w-40">Year:</label>
                <input
                  type="text"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-300"
                  id="year"
                  name="year"
                  value={formData.year}
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
        )}
      </div>
    </div>
  );
};

export default StudentProfileEdit;
