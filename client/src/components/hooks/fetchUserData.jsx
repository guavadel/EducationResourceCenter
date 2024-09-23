import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const useFetchUserData = () => {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [userId, setUserId] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const [resources, setResources] = useState([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserRaw = localStorage.getItem('Users');
        console.log('Raw Stored User:', storedUserRaw); // Debug line

        const storedUser = JSON.parse(storedUserRaw);
        console.log('Parsed Stored User:', storedUser); // Debug line

        if (storedUser && storedUser._id) {
          setUserId(storedUser._id);

          const response = await axios.get(`http://localhost:3000/resources/manage/${storedUser._id}`, {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true, // Ensure credentials are sent with the request
          });

          console.log('Response Data:', response.data); // Debug line

          if (response.data && response.data.educator) {
            const userResources = response.data.resources.filter(resource => 
              resource.educator && resource.educator._id === storedUser._id
            );
            setResources(userResources);
            setUserDetails(response.data.educator);
            console.log('User Details:', response.data.educator); // Debug line
          } else {
            setErrorMessage('User not found or no resources available.');
          }
        } else {
          setErrorMessage('No user data found in localStorage.');
          navigate('/home');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
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

  return { loading, errorMessage, userDetails, resources, userId };
};

export default useFetchUserData;
