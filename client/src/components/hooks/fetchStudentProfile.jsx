import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

axios.defaults.withCredentials = true;

const useFetchStudentProfile = () => {
  const { userId } = useParams();
  const [student, setstudent] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();
  

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('Users'));
    if (user) {
      setIsLoggedIn(true);
      setUserRole(user.role);
    }
  }, []);

  useEffect(() => {
    const fetchstudentProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/profile/student/${userId}`, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        });
        setstudent(res.data.student);
      } catch (error) {
        console.error('Error fetching student profile:', error);
        if (error.response && error.response.status === 401) {
          setErrorMessage('Unauthorized access. Please log in again.');
          setTimeout(() => {
            navigate('/');
          }, 2000);
        } else {
          setErrorMessage('Failed to fetch student profile. Please try again.');
        }
      }
    };

    if (userId) {
      fetchstudentProfile();
    } else {
      navigate('/'); // Redirect to login if userId is not available
    }
  }, [userId, navigate]);

  return { student, errorMessage };
};

export default useFetchStudentProfile;
