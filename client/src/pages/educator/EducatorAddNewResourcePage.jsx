import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import DashboardSidebar from '../../components/DashboardAssets/SideBar';

const EducatorAddNewResourcePage = () => {
  const { userId } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [subject, setSubject] = useState('');
  const [branch, setBranch] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('file', file);
    formData.append('subject', subject);
    formData.append('branch', branch);

    try {
      const res = await toast.promise(
        axios.post(`http://localhost:3000/resources/manage/${userId}/new`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          withCredentials: true
        }),
        {
          loading: 'Adding resource...',
          success: 'Resource added successfully!',
          error: (error) => {
            console.error('Error adding resource:', error);
            return 'Failed to add resource. Please try again.';
          }
        }
      );

      console.log('Resource added successfully:', res.data);
      const newResourceId = res.data.resource._id;

      setTimeout(() => {
        navigate(`/educator/resources/${userId}/show/${newResourceId}`);
      }, 1000);

    } catch (error) {
      console.error('Error adding resource:', error);
      if (error.response) {
        console.error('Server Error:', error.response.data);
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else if (error.request) {
        console.error('No response received:', error.request);
        setErrorMessage('Failed to add resource. Please check your network connection.');
      } else {
        console.error('Error:', error.message);
        setErrorMessage('Failed to add resource. Please try again later.');
      }
    }
  };

  return (
    <div className='flex'>
      <DashboardSidebar />
      <div className="flex-auto mt-3  p-5 ">
        <h2 className="text-4xl font-semibold text-slate-500 mb-4">Add New Resource</h2>
        {errorMessage && <div className="text-red-600 mb-4">{errorMessage}</div>}
        <form onSubmit={handleFormSubmit} className="card bg-gray-900 p-5 rounded-3xl w-3/6 space-y-4">
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-400 text-lg font-medium mb-1 ">Title</label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded-lg bg-slate-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-slate-500 "
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-400 text-lg font-medium mb-1 ">Description</label>
            <textarea
              className="w-full px-3 py-2 rounded-lg bg-slate-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-slate-500 "
              id="description"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="subject" className="block text-gray-400 text-lg font-medium mb-1 ">Subject</label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded-lg bg-slate-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-slate-500 "
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="branch" className="block text-gray-400 text-lg font-medium mb-1 ">Branch</label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded-lg bg-slate-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-slate-500 "
              id="branch"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="file" className="block text-gray-400 text-lg font-medium mb-1 ">File</label>
            <div className="flex items-center">
              <input
                type="file"
                className="hidden"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
                required
              />
              <label
                htmlFor="file"
                className="px-3 py-3 bg-slate-950 text-white rounded-lg cursor-pointer hover:bg-slate-800 transition duration-300 ease-in-out"
              >
                Choose File
              </label>
              {file && (
                <span className="ml-2 text-gray-700">{file.name}</span>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-slate-950 text-gray-400 justify-start items-center p-3 rounded hover:bg-gray-300 hover:text-slate-800 transition duration-300 ease-in-out decoration-transparent border-none"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EducatorAddNewResourcePage;
