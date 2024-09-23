import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const EducatorRegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [experience, setExperience] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/register', {
        name,
        email,
        username,
        password,
        collegeName,
        experience,
        role: 'educator'
      });

      // Store user data in localStorage
      localStorage.setItem('Users', JSON.stringify(res.data.user));
      console.log('Registration successful:', res.data);
      navigate('/home');
      navigate(0)
      toast.success('Logged in Successfully');
        
    } catch (error) {
      console.error('Error registering educator:', error.response.data);
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <div className="container mx-auto mt-20 mb-10 space-x-2 flex">
      {/* Left Div */}
      <div className="w-1/2 px-8 py-10 bg-gray-800 text-white flex flex-col justify-center items-center rounded-3xl">
        <h2 className="text-6xl font-bold mb-5 text-center">Welcome to Educator Portal!</h2>
        <p className="text-lg mb-6 mx-28 text-center font-thin">Create an account or log in to get started with our platform. Join us today to make the most out of our services!</p>
        <p className="text-lg mb-2 font-thin m-3">Already have an account?</p>
        <button
          onClick={() => navigate('/educator/login')}
          className="bg-none mt-2 hover:bg-slate-200 font-semibold py-2 px-4 rounded-full border-white text-slate-300 hover:text-slate-800 transition duration-300 ease-in-out w-1/2 h-16"
        >
          Sign In
        </button>
      </div>

      {/* Right Div */}
      <div className="w-1/2 px-8 py-10 bg-gray-900 rounded-3xl">
        <form onSubmit={handleSubmit} className="space-y-4 p-10">
          <h1 className='text-gray-300 text-2xl'>Create Account</h1>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-300 text-lg mb-2">User Details</label>
            <input
              type="text"
              placeholder='Name'
              className="shadow bg-gray-700 border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-gray-100"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder='Email'
              className="shadow bg-gray-700 border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-gray-100"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder='Username'
              className="shadow bg-gray-700 border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-gray-100"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder='Password'
              className="shadow bg-gray-700 border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-gray-100"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="collegeName" className="block text-gray-300 text-lg mb-2">Education</label>
            <input
              type="text"
              placeholder='College Name'
              className="shadow bg-gray-700 border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-gray-100"
              id="collegeName"
              value={collegeName}
              onChange={(e) => setCollegeName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder='Experience'
              className="shadow bg-gray-700 border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-gray-100"
              id="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default EducatorRegisterPage;
