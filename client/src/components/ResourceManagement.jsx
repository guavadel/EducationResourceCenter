import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ResourceManagement() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetchResources = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('/api/resources', {
          headers: {
            'x-auth-token': token,
          },
        });
        setResources(res.data);
      } catch (err) {
        console.error('Error fetching resources:', err);
      }
    };

    fetchResources();
  }, []);

  return (
    <div>
      <h2>Manage Resources</h2>
      <ul>
        {resources.map((resource) => (
          <li key={resource._id}>{resource.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default ResourceManagement;
