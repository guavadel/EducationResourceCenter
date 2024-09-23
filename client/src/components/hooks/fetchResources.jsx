// src/hooks/fetchResources.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchResources = (userId, navigate) => {
  const [resources, setResources] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchResources = async () => {
      try {
        if (!userId) return;

        const response = await axios.get(`http://localhost:3000/resources/manage/${userId}`, {
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

    fetchResources();
  }, [userId, navigate]);

  return { resources, errorMessage };
};

export default useFetchResources;
