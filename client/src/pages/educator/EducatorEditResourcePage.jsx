import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import DashboardSidebar from '../../components/DashboardAssets/SideBar';

axios.defaults.withCredentials = true;

const EducatorEditResourcePage = () => {
  const { userId, resourceId } = useParams();
  const [file, setFile] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [resource, setResource] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: '',
    branch: '',
    file: '', // assuming this is the file name or identifier
  });
  const [errorMessage, setErrorMessage] = useState('');
    const [filePreview, setFilePreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('Users'));
    if (user) {
      setIsLoggedIn(true);
      setUserRole(user.role);
    }
  }, []);

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/resources/manage/${userId}/edit/${resourceId}`, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });

        if (res.data && res.data.resource) {
          const { title, description, subject, branch, file } = res.data.resource;
          setFormData({ title, description, subject, branch, file });
        } else {
          setErrorMessage('Resource data not found.');
        }
      } catch (error) {
        console.error('Error fetching resource:', error);
        setErrorMessage('Failed to fetch resource. Please try again.');
        setTimeout(() => {
          navigate(`/educator/resources/${userId}`);
        }, 2000);
      }
    };

    if (userId && resourceId) {
      fetchResource();
    } else {
      setErrorMessage('Invalid user ID or resource ID.');
    }
  }, [userId, resourceId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataForSubmission = new FormData();
    formDataForSubmission.append('title', formData.title);
    formDataForSubmission.append('description', formData.description);
    formDataForSubmission.append('subject', formData.subject);
    formDataForSubmission.append('branch', formData.branch);
    formDataForSubmission.append('file', file);

    try {
      const res = await axios.put(`http://localhost:3000/resources/manage/${userId}/edit/${resourceId}`, formDataForSubmission, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      toast.promise(Promise.resolve(res), {
        loading: 'Updating...',
        success: 'Updated the resource successfully',
        error: 'Could not update.',
      });

      const newResourceId = res.data.resource._id;
      setTimeout(() => {
        navigate(`/educator/resources/${userId}/show/${newResourceId}`);
      }, 1000);
    } catch (error) {
      console.error('Error updating resource:', error.response.data);
      setErrorMessage('Failed to update resource. Please check your inputs.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFormData({ ...formData, file: selectedFile.name });
      setFile(selectedFile);
    }
  };

  return (
    <div className="bg-slate-900 h-full w-full flex flex-row gap-x-7 px-0 py-0">
      <div className="w-1/6 min-h-screen bg-yellow">
        <DashboardSidebar />
      </div>
      <div className="w-3/6 h-screen flex flex-col gap-6 p-10 bg-transparent rounded-lg shadow-lg shadow-white">
        <h2 className="text-5xl font-semibold mb-4 text-gray-600">Edit Resource</h2>
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-200 text-red-800 border border-red-300 rounded">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} className="p-10 shadow-lg bg-gradient-to-br from-slate-900 from-60% to-slate-800 rounded-xl">
          <div className="mb-6 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <label htmlFor="title" className="text-gray-500 font-medium text-2xl w-40">Title:</label>
              <input
                type="text"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-300"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex items-center gap-4">
              <label htmlFor="description" className="text-gray-500 font-medium text-2xl w-40">Description:</label>
              <textarea
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-300"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                required
              ></textarea>
            </div>
            <div className="flex items-center gap-4">
              <label htmlFor="subject" className="text-gray-500 font-medium text-2xl w-40">Subject:</label>
              <input
                type="text"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-300"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex items-center gap-4">
              <label htmlFor="branch" className="text-gray-500 font-medium text-2xl w-40">Branch:</label>
              <input
                type="text"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-300"
                id="branch"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6 flex items-center gap-4">
              <label htmlFor="file" className="text-gray-500 font-medium text-2xl w-40">File:</label>
              <input
                type="file"
                className="hidden"
                id="file"
                name="file"
                onChange={handleFileChange}
                required
              />
              <label
                htmlFor="file"
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg cursor-pointer text-gray-300 bg-slate-800 hover:bg-slate-700 transition duration-300 ease-in-out"
              >
                Choose File
              </label>
              <div className="flex flex-col items-start">
                {filePreview && (
                  <img
                    src={filePreview}
                    alt="File Preview"
                    className="w-32 h-32 object-cover mt-2 rounded"
                  />
                )}
                <p className="text-gray-300 mt-2">Previously uploaded file: {formData.file}</p>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-slate-950 text-gray-400 justify-start items-center p-3 rounded hover:bg-gray-300 hover:text-slate-800 transition duration-300 ease-in-out decoration-transparent border-none"
          >
            Update Resource
          </button>
        </form>
      </div>
    </div>
  );
};

export default EducatorEditResourcePage;
