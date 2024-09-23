import React, { useState, useEffect } from 'react';

const TestComponent = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/test')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Server Message:</h1>
      <p>{message}</p>
    </div>
  );
};

export default TestComponent;
