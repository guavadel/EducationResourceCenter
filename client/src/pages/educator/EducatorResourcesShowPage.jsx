import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import 'bootstrap/dist/css/bootstrap.min.css';
import DashboardSidebar from '../../components/DashboardAssets/SideBar';

axios.defaults.withCredentials = true;

const EducatorResourcesShowPage = () => {
  const { userId, resourceId } = useParams();
  const [resource, setResource] = useState(null);
  const [educator, setEducator] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchResource();
  }, [userId, resourceId]);

  const fetchResource = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/resources/manage/${userId}/show/${resourceId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, // Include credentials if needed
      });
      console.log(response.data);

      if (response.data && response.data.resource) {
        const educatorResponse = await axios.get(`http://localhost:3000/profile/${response.data.resource.educator}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, // Include credentials if needed
        });

        setEducator(educatorResponse.data);
        setResource(response.data.resource);
        setCurrentUser(response.data.currentUser); // Assuming you have currentUser data in response
      } else {
        setErrorMessage('Resource data not found.');
        toast.error('Resource not found.');
        setTimeout(() => {
          navigate('/educator/resources');
        }, 1000);
      }
    } catch (error) {
      console.error('Error fetching resource:', error);
      setErrorMessage('Failed to fetch resource.');
      toast.error('Failed to fetch resource.');
      setTimeout(() => {
        navigate('/educator/resources');
      }, 1000);
    }
  };

  const handleDownload = async () => {
    try {
      if (!resource || !resource.file) {
        throw new Error('Resource or file not available for download');
      }

      const downloadResponse = await axios.get(`http://localhost:3000/download/${resource.file}`, {
        responseType: 'blob', // Ensure response type is blob
        withCredentials: true, // Include credentials if needed
      });

      // Create a URL to the blob
      const url = window.URL.createObjectURL(new Blob([downloadResponse.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', resource.file);
      document.body.appendChild(link);

      // Trigger the download
      link.click();

      // Clean up
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

  const handleDelete = async () => {
    try {
      console.log(`Attempting to delete resource with ID: ${resourceId}`); // Add logging
      const response = await axios.delete(`http://localhost:3000/resources/manage/${userId}/delete/${resourceId}`, {
        withCredentials: true,
      });
  
      console.log('Delete response:', response); // Add logging
  
      if (response.status === 200) {
        toast('Resource Deleted!', {
          icon: '🗑️',
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
  
        setResource(null); // Clear the resource state
  
        // Redirect to resources list
        navigate('/educator/resources');
      } else {
        throw new Error('Failed to delete resource.');
      }
    } catch (error) {
      console.error('Error deleting resource:', error);
      setErrorMessage('Failed to delete resource.');
      toast.error('Failed to delete resource.');
    }
  };
  
  

  if (!resource) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      <DashboardSidebar />
      <div className='flex flex-col m-5 mx-10 w-full'>
        <h2 className='text-5xl font-semibold text-slate-600 pb-3'>Resource Details</h2>
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        <div className='flex'>
          <div className="card mt-3 w-3/6 rounded-lg p-5 bg-gradient-to-br from-50% from-slate-900 to-slate-700 shadow-dark-gray-bottom-right m-3 pt-5">
            <h5 className="text-2xl font-semibold text-slate-400 my-3">{resource.title}</h5>
            <p className="text-xl text-slate-500 my-3">{resource.description}</p>

            <button className="bg-slate-950 text-gray-400 justify-start items-center p-3 rounded hover:bg-gray-300 hover:text-slate-800 transition duration-300 ease-in-out decoration-transparent border-none my-3 mt-5 mr-2" onClick={handleDownload}>Download File</button>
            {currentUser && resource.educator === currentUser._id && (
              <div className='flex gap-2'>
                <button className="bg-red-950 text-gray-400 justify-start items-center p-3 rounded hover:bg-gray-300 hover:text-red-900 transition duration-300 ease-in-out decoration-transparent border-none my-2 w-1/2" onClick={handleDelete}>Delete</button>
                <button onClick={() => navigate(`/educator/resources/${userId}/edit/${resource._id}`)} className="bg-yellow-800 text-gray-400 justify-start items-center p-3 rounded hover:bg-gray-300 hover:text-yellow-800 transition duration-300 ease-in-out decoration-transparent border-none my-2 w-1/2">Edit</button>
              </div>
            )}
            <a href="/educator/resources" className="text-slate-400">
              <button className='bg-slate-950 text-gray-400 justify-start items-center p-3 rounded hover:bg-gray-300 hover:text-slate-800 transition duration-300 ease-in-out decoration-transparent border-none w-3/6 mt-2'>Back</button>
            </a>
          </div>
          <div className="card w-3/6 rounded-lg p-5 bg-gradient-to-br from-50% from-slate-900 to-slate-700 shadow-dark-gray-bottom-right m-3 py-3">
            <div className="my-8 py-24">
              <p className="text-xl text-slate-600 my-4"><span className='text-gray-400'>Subject:</span> {resource.subject}</p>
              <p className="text-xl text-slate-600 my-4"><span className='text-gray-400'>Branch:</span> {resource.branch}</p>
              <p className="text-xl text-slate-600 my-4"><span className='text-gray-400'>Uploaded By:</span> {educator.username}</p>
              <p className="text-xl text-slate-600 my-4"><span className='text-gray-400'>Uploaded At:</span> {new Date(resource.createdAt).toLocaleString()}</p>
              {resource.file && (
                <p className="text-xl text-slate-600 my-4"><span className='text-gray-400'>File Name:</span> {resource.file}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducatorResourcesShowPage;
