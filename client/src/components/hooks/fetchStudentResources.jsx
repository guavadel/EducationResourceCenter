// src/hooks/fetchStudentResources.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchStudentResources = (userId, navigate) => {
  const [resources, setResources] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchStudentResources = async () => {
      try {
        if (!userId) return;

        const response = await axios.get(`http://localhost:3000/resources/view/${userId}`, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        });

        if (response.data && response.data.resources && response.data.resources.length > 0) {
          setResources(response.data.resources);
        } else {
          setErrorMessage('No resources found.');
        }
      } catch (error) {
        console.error('Error fetching resources:', error);
        setErrorMessage('Failed to fetch resources.');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    };

    fetchStudentResources();
  }, [userId, navigate]);

  return { resources, errorMessage };
};

export default useFetchStudentResources;
