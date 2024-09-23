// src/pages/EducatorResourcesIndexPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetchResources from '../../components/hooks/fetchResources';
import useHandleViewResource from '../../components/hooks/HandleViewResources';
import RenderResources from '../../components/ResourcesAssets/RenderResources';
import DashboardSidebar from '../../components/DashboardAssets/SideBar';

const EducatorResourcesIndexPage = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('Users'));
    if (storedUser && storedUser._id) {
      setUserId(storedUser._id);
    }
  }, []);
const navigate = useNavigate()

  const { resources, errorMessage } = useFetchResources(userId, navigate);
  const { handleViewResource } = useHandleViewResource(userId);

  return (
    <div className="flex">
      <DashboardSidebar/>
      <div className='m-3 p-5'>
      <h2 className='text-6xl font-semibold px-2 text-slate-500 pb-5'>All Resources</h2>
      <br />
      <div className="row ">
        <RenderResources
          resources={resources}
          errorMessage={errorMessage}
          userId={userId}
          handleViewResource={handleViewResource}
        />
      </div>
      </div>
    </div>
  );
};

export default EducatorResourcesIndexPage;
