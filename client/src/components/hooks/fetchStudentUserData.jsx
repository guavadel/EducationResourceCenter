import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const useFetchStudentUserData = () => {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [userDetails, setUserDetails] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('Users'));
        if (storedUser && storedUser._id) {
          const response = await axios.get(`http://localhost:3000/profile/student/${storedUser._id}`, {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          });

          if (response.data) {
            setUserDetails(response.data);
          } else {
            setErrorMessage('User not found.');
          }
        } else {
          setErrorMessage('No user data found in localStorage.');
          navigate('/home');
        }
      } catch (error) {
        setErrorMessage('Failed to fetch user data.');
        setTimeout(() => {
          navigate('/home');
        }, 2000);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  return { loading, errorMessage, userDetails };
};

export default useFetchStudentUserData;
