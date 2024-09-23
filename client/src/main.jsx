// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './css/index.css';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './components/contexts/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <AuthProvider>
   <div><Toaster /></div>
   <App />
   </AuthProvider>
  </React.StrictMode>,
);
