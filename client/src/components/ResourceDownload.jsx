import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ResourceDownload() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await axios.get('/api/resources');
        setResources(res.data);
      } catch (err) {
        console.error('Error fetching resources:', err);
      }
    };

    fetchResources();
  }, []);

  return (
    <div>
      <h2>Download Resources</h2>
      <ul>
        {resources.map((resource) => (
          <li key={resource._id}>
            <a href={resource.fileUrl} target="_blank" rel="noopener noreferrer">
              {resource.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ResourceDownload;
