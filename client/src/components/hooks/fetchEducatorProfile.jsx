import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

axios.defaults.withCredentials = true;

const useFetchEducatorProfile = () => {
  const { userId } = useParams();
  const [educator, setEducator] = useState(null);
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
    const fetchEducatorProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/profile/educator/${userId}`, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        });
        setEducator(res.data.educator);
      } catch (error) {
        console.error('Error fetching educator profile:', error);
        if (error.response && error.response.status === 401) {
          setErrorMessage('Unauthorized access. Please log in again.');
          setTimeout(() => {
            navigate('/');
          }, 2000);
        } else {
          setErrorMessage('Failed to fetch educator profile. Please try again.');
        }
      }
    };

    if (userId) {
      fetchEducatorProfile();
    } else {
      navigate('/'); // Redirect to login if userId is not available
    }
  }, [userId, navigate]);

  return { educator, errorMessage };
};

export default useFetchEducatorProfile;
