import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { startConfetti, stopConfetti } from '../../components/Confetti'; // Update the path if necessary

function StudentHome() {
  const [userId, setUserId] = useState(null);

  const confettiIntervalRef = useRef(null);

  useEffect(() => {
    const storedData = localStorage.getItem('Users');
    const userData = storedData ? JSON.parse(storedData) : null;
    console.log('Logged-in User Details:', userData);
  }, []);

  const handleDownload = () => {
    // Start confetti
    confettiIntervalRef.current = startConfetti();
    
    // Show toast notification with a button
    toast((t) => (
      <div className="flex items-center justify-between">
         <p>You can download resources from the Resources page.</p>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              // Navigate to resources page
              window.location.href = '/student/resources';
            }}
            className="hover:border-red-900 bg-blue-950 text-white font-bold py-1 px-3 rounded transition-colors duration-300 hover:animate-funny-dance hover:bg-gradient-to-r hover:from-yellow-400 hover:via-red-500 hover:to-pink-500 " 
          >
            View Resources
          </button>
      </div>
    ), {
      icon: '🎉',
      style: {
        border: '1px solid #060438',
        padding: '16px',
        color: '#060438',
      },
      iconTheme: {
        primary: '#060438',
        secondary: '#060438',
      },
    });

    // Stop confetti after 3 seconds
    setTimeout(() => {
      stopConfetti(confettiIntervalRef.current);
    }, 3000);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-500 overflow-x-hidden">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4 text-slate-300">Welcome, Student!</h2>
        <p className="text-lg mb-8 text-slate-200">Your gateway to a wealth of educational resources. Download any available resources below.</p>
        
        <button 
          className="bg-slate-900 hover:bg-slate-800 font-semibold py-2 px-4 rounded text-slate-300 hover:text-slate-200 transition duration-300 ease-in-out"
          onClick={handleDownload}
        >
          Notify Me About Downloads
        </button>

        <div className="mt-8">
          <Link to={`/student/profile/${userId}`} className="bg-gradient-to-r from-slate-800 via-slate-950 to-slate-900 hover:bg-slate-800 font-semibold py-2 px-4 rounded text-slate-300 hover:text-slate-200 transition duration-300 ease-in-out">
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StudentHome;
