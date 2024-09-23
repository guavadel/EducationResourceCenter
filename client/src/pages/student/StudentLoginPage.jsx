import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const StudentLoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    
    try {
      const res = await axios.post('http://localhost:3000/login', data, { withCredentials: true });
      localStorage.setItem('Users', JSON.stringify(res.data.user));
  
      navigate('/home');
      navigate(0)
      toast.success('Logged in Successfully');
  
    } catch (err) {
      toast.error('Incorrect username or password');
    }
  };
  
  return (
    <div className="container mx-auto mt-20 mb-10 flex space-x-2">
      {/* Left Div */}
      <div className="w-1/2 px-8 py-10 bg-gray-800 text-white flex flex-col justify-center items-center rounded-3xl">
        <h2 className="text-6xl font-bold mb-5">Welcome Back!</h2>
        <p className="text-lg mb-6 mx-28 text-center font-thin">Create an account or log in to get started with our platform. Join us today to make the most out of our services!</p>
        <p className="text-lg mb-2 font-thin m-3">Don't have an account?</p>
        <button
          onClick={() => navigate('/student/register')}
          className="bg-none mt-2 hover:bg-slate-200 font-semibold py-2 px-4 rounded-full border-white text-slate-300 hover:text-slate-800 transition duration-300 ease-in-out w-1/2 h-16"
        >
          Sign Up
        </button>
      </div>

      {/* Right Div */}
      <div className="w-1/2 px-8 py-10 bg-gray-900 rounded-3xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-10">
          <h3 className="text-2xl font-bold mb-6 text-gray-300">Student Login</h3>
          <div className="mb-4">
            <label className="block text-gray-300 text-lg mb-2">Username:</label>
            <input
              type="text"
              className="shadow bg-gray-700 border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-gray-100"
              {...register('username', { required: 'Username is required' })}
            />
            {errors.username && <p className="text-red-500 text-xs italic">{errors.username.message}</p>}
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 text-lg mb-2">Password:</label>
            <input
              type="password"
              className="shadow bg-gray-700 border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline text-gray-100"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="bg-slate-950 hover:bg-slate-800 hover:text-slate-200 text-gray-200 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentLoginPage;
