import React, { useState } from 'react';
import axios from 'axios';

function ResourceUpload() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fileUrl, setFileUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('/api/resources/upload', { title, description, fileUrl }, {
        headers: {
          'x-auth-token': token,
        },
      });
      // Handle success
    } catch (err) {
      console.error('Error uploading resource:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label>Description:</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label>File URL:</label>
        <input type="text" value={fileUrl} onChange={(e) => setFileUrl(e.target.value)} />
      </div>
      <button type="submit">Upload</button>
    </form>
  );
}

export default ResourceUpload;
