// src/hooks/handleViewResource.js
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const useHandleViewResource = (userId) => {
  const navigate = useNavigate();

  const handleViewResource = (resourceId) => {
    toast.promise(
      new Promise((resolve) =>
        setTimeout(() => {
          resolve();
          navigate(`/educator/resources/${userId}/show/${resourceId}`);
        }, 1000)
      ),
      {
        loading: 'Loading resource...',
        success: 'Resource loaded successfully',
        error: 'Failed to load resource',
        style: {
          border: '1px solid blue',
        },
      }
    );
  };

  return { handleViewResource };
};

export default useHandleViewResource;
