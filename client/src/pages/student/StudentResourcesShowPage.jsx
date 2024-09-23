import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import 'bootstrap/dist/css/bootstrap.min.css';
import StudentSidebar from '../../components/DashboardAssets/StudentSidebar';

axios.defaults.withCredentials = true;

const StudentResourcesShowPage = () => {
  const { resourceId } = useParams();
  const [resource, setResource] = useState(null);
  const [educator, setEducator] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState(null); // Renamed to `user`
  const navigate = useNavigate();

  useEffect(() => {
    fetchResource();
  }, [resourceId]);

 const fetchResource = async () => {
  try {
    // Retrieve user from localStorage
    const storedData = localStorage.getItem('Users');
    const userData = JSON.parse(storedData);

    // Check if userData is null or undefined
    if (!userData || !userData._id) {
      throw new Error('User data is missing or invalid.');
    }

    const userId = userData._id;
    console.log('User ID:', userId); // Log userId for debugging

    const response = await axios.get(`http://localhost:3000/resources/view/${userId}/show/${resourceId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    console.log('Resource response:', response.data);

    if (response.data && response.data.resource) {
      const educatorResponse = await axios.get(`http://localhost:3000/profile/${response.data.resource.educator}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      setResource(response.data.resource);
      setEducator(educatorResponse.data);
      setUser(userData); // Set user data if available
    } else {
      setErrorMessage('Resource not found.');
      toast.error('Resource not found.');
      setTimeout(() => {
        navigate('/student/resources');
      }, 1000);
    }
  } catch (error) {
    console.error('Error fetching resource:', error);
    setErrorMessage('Failed to fetch resource.');
    toast.error('Failed to fetch resource.');
    setTimeout(() => {
      navigate('/student/resources');
    }, 1000);
  }
};

  

  const handleDownload = async () => {
    try {
      if (!resource || !resource.file) {
        throw new Error('Resource or file not available for download');
      }

      const downloadResponse = await axios.get(`http://localhost:3000/download/${resource.file}`, {
        responseType: 'blob',
        withCredentials: true,
      });

      const url = window.URL.createObjectURL(new Blob([downloadResponse.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', resource.file);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast('Downloading...', {
        icon: '📥',
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
        iconTheme: {
          primary: '#713200',
          secondary: '#FFFAEE',
        },
      });
    } catch (error) {
      console.error('Error downloading file:', error);
      setErrorMessage('Failed to download file.');
      toast.error('Failed to download file.');
    }
  };

  if (!resource) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
    <StudentSidebar />
    <div className='flex flex-col m-5 mx-10 w-full'>
      <h2 className='text-5xl font-semibold text-slate-600 pb-3'>Resource Details</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <div className='flex'>
        <div className="card mt-3 w-3/6 rounded-lg p-5 bg-gradient-to-br from-slate-900 to-slate-700 shadow-dark-gray-bottom-right m-3 pt-5">
          <h5 className="text-2xl font-semibold text-slate-400 my-3">{resource.title}</h5>
          <p className="text-xl text-slate-500 my-3">{resource.description}</p>
          <div className='flex gap-2 mt-5'>
            <button 
              className="bg-slate-950 text-gray-400 justify-start items-center p-3 rounded hover:bg-gray-300 hover:text-slate-800 transition duration-300 ease-in-out decoration-transparent border-none"
              onClick={handleDownload}
            >
              Download Resource
            </button>
            <a href="/student/resources" className="text-slate-400">
              <button 
                className='bg-slate-950 text-gray-400 justify-start items-center p-3 rounded hover:bg-gray-300 hover:text-slate-800 transition duration-300 ease-in-out decoration-transparent border-none'
              >
                Back to Resources
              </button>
            </a>
          </div>
        </div>
        <div className="card w-3/6 rounded-lg p-5 bg-gradient-to-br from-slate-900 to-slate-700 shadow-dark-gray-bottom-right m-3 py-3">
          <div className="my-8 py-24">
            <p className="text-xl text-slate-600 my-4">
              <span className='text-gray-400'>Subject:</span> {resource.subject}
            </p>
            <p className="text-xl text-slate-600 my-4">
              <span className='text-gray-400'>Branch:</span> {resource.branch}
            </p>
            <p className="text-xl text-slate-600 my-4">
              <span className='text-gray-400'>Uploaded By:</span> {educator.username || 'Unknown'}
            </p>
            <p className="text-xl text-slate-600 my-4">
              <span className='text-gray-400'>Uploaded At:</span> {new Date(resource.createdAt).toLocaleString()}
            </p>
            {resource.file && (
              <p className="text-xl text-slate-600 my-4">
                <span className='text-gray-400'>File Name:</span> {resource.file}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
    
  );
};

export default StudentResourcesShowPage;
